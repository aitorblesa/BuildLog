const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export class StorageRepository<T> {
  constructor(
    private readonly key: string,
    private readonly defaultValue: T,
  ) {}

  read(): T {
    if (!isBrowser) return this.defaultValue;
    try {
      const raw = window.localStorage.getItem(this.key);
      if (!raw) return this.defaultValue;
      return { ...this.defaultValue, ...JSON.parse(raw) } as T;
    } catch {
      return this.defaultValue;
    }
  }

  write(value: T): void {
    if (!isBrowser) return;
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }

  update(updater: (current: T) => T): T {
    const next = updater(this.read());
    this.write(next);
    return next;
  }

  clear(): void {
    if (!isBrowser) return;
    window.localStorage.removeItem(this.key);
  }
}

export { isBrowser };
