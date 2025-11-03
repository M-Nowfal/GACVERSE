export class Cache {
  private cache: Map<string, any[]>;

  constructor() {
    this.cache = new Map();
  }
  set(key: string, value: []): void {
    this.cache.set(key, value);
  }
  get(key: string) {
    return this.cache.get(key);
  }
  remove(key: string): void {
    this.cache.delete(key);
  }
  clear(): void {
    this.cache.clear();
  } 
  has(key: string): boolean {
    return this.cache.has(key);
  }
}
