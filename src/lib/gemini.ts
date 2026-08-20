/**
 * Cliente mínimo de la API de Gemini (Google AI Studio).
 *
 * La app es estática y personal, así que no hay servidor donde esconder la
 * clave: se llama desde el navegador con la clave del propio usuario, guardada
 * en localStorage a través de SettingsRepository. La clave nunca sale hacia
 * ningún sitio que no sea generativelanguage.googleapis.com.
 */

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

/** Modelo por defecto: alias que Google va apuntando al último Flash estable. */
export const DEFAULT_MODEL = 'gemini-flash-latest';

/** Subconjunto de OpenAPI que acepta `responseSchema`. */
export interface Schema {
  type: 'OBJECT' | 'ARRAY' | 'STRING' | 'NUMBER' | 'INTEGER' | 'BOOLEAN';
  description?: string;
  enum?: string[];
  format?: string;
  items?: Schema;
  properties?: Record<string, Schema>;
  required?: string[];
  propertyOrdering?: string[];
  minItems?: number;
  maxItems?: number;
  nullable?: boolean;
}

export class GeminiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'GeminiError';
  }
}

interface GeminiPart {
  text?: string;
}

interface GeminiResponse {
  candidates?: { content?: { parts?: GeminiPart[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string; details?: { reason?: string }[] };
}

const BAD_KEY_MESSAGE = 'La clave de API no es válida o no tiene permiso. Revísala en Ajustes.';

/** Traduce los fallos habituales de la API a algo accionable en castellano. */
function messageForStatus(status: number, detail: string, reason: string): string {
  // Una clave inválida llega como 400 API_KEY_INVALID, no como 401.
  if (reason === 'API_KEY_INVALID' || /api key not valid/i.test(detail)) return BAD_KEY_MESSAGE;
  if (status === 400) return `Petición rechazada por Gemini. ${detail}`.trim();
  if (status === 401 || status === 403) return BAD_KEY_MESSAGE;
  if (status === 404) return 'Ese modelo no existe para tu clave. Elige otro en Ajustes.';
  if (status === 429) return 'Has superado la cuota gratuita de Gemini por ahora. Espera un poco e inténtalo de nuevo.';
  if (status >= 500) return 'Gemini no está disponible en este momento. Inténtalo de nuevo en unos segundos.';
  return detail || `Error ${status} al llamar a Gemini.`;
}

async function errorFromResponse(response: Response): Promise<GeminiError> {
  let detail = '';
  let reason = '';
  try {
    const body = (await response.json()) as GeminiResponse;
    detail = body.error?.message ?? '';
    reason = body.error?.details?.find((d) => d.reason)?.reason ?? '';
  } catch {
    detail = '';
  }
  return new GeminiError(messageForStatus(response.status, detail, reason), response.status);
}

function networkError(error: unknown): GeminiError {
  if (error instanceof GeminiError) return error;
  if (error instanceof DOMException && error.name === 'AbortError') {
    return new GeminiError('Petición cancelada.');
  }
  return new GeminiError('No se ha podido conectar con Gemini. Comprueba tu conexión.');
}

export interface GenerateJsonOptions {
  apiKey: string;
  model?: string;
  /** Instrucción de sistema: quién es el modelo y cómo debe responder. */
  system: string;
  /** El turno de usuario con el contenido concreto. */
  user: string;
  schema: Schema;
  temperature?: number;
  maxOutputTokens?: number;
  signal?: AbortSignal;
}

/**
 * Pide a Gemini una respuesta en JSON con forma fija (`responseSchema`) y la
 * devuelve ya parseada.
 */
export async function generateJson<T>(options: GenerateJsonOptions): Promise<T> {
  const { apiKey, model = DEFAULT_MODEL, system, user, schema, temperature = 0.6, maxOutputTokens = 2048, signal } = options;

  if (!apiKey) throw new GeminiError('Falta la clave de API de Gemini. Añádela en Ajustes.');

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature,
          maxOutputTokens,
        },
      }),
    });
  } catch (error) {
    throw networkError(error);
  }

  if (!response.ok) throw await errorFromResponse(response);

  const data = (await response.json()) as GeminiResponse;

  if (data.promptFeedback?.blockReason) {
    throw new GeminiError('Gemini ha bloqueado la petición por sus filtros de contenido.');
  }

  const candidate = data.candidates?.[0];
  const text = (candidate?.content?.parts ?? [])
    .map((part) => part.text ?? '')
    .join('')
    .trim();

  if (!text) {
    if (candidate?.finishReason === 'MAX_TOKENS') {
      throw new GeminiError('La respuesta de Gemini se ha cortado por longitud. Inténtalo de nuevo.');
    }
    throw new GeminiError('Gemini ha devuelto una respuesta vacía.');
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new GeminiError('Gemini ha devuelto un JSON que no se puede leer.');
  }
}

export interface GeminiModel {
  id: string;
  label: string;
}

/**
 * Lista los modelos que la clave puede usar con generateContent. Sirve de
 * "probar conexión" en Ajustes y evita tener que adivinar el nombre del modelo.
 */
export async function listModels(apiKey: string, signal?: AbortSignal): Promise<GeminiModel[]> {
  if (!apiKey) throw new GeminiError('Falta la clave de API de Gemini.');

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/models?pageSize=200`, {
      headers: { 'x-goog-api-key': apiKey },
      signal,
    });
  } catch (error) {
    throw networkError(error);
  }

  if (!response.ok) throw await errorFromResponse(response);

  const data = (await response.json()) as {
    models?: { name?: string; displayName?: string; supportedGenerationMethods?: string[] }[];
  };

  return (data.models ?? [])
    .filter((model) => model.supportedGenerationMethods?.includes('generateContent'))
    .map((model) => ({
      id: (model.name ?? '').replace(/^models\//, ''),
      label: model.displayName ?? (model.name ?? '').replace(/^models\//, ''),
    }))
    .filter((model) => model.id.length > 0)
    .sort((a, b) => a.id.localeCompare(b.id));
}
