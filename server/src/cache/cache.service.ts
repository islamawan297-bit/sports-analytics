import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private memoryCache = new Map<string, { value: any; expiresAt: number }>();

  async get<T>(key: string): Promise<T | null> {
    const cached = this.memoryCache.get(key);
    if (!cached) return null;
    if (Date.now() > cached.expiresAt) {
      this.memoryCache.delete(key);
      return null;
    }
    return cached.value as T;
  }

  async set(key: string, value: any, ttlSeconds: number = 60): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.memoryCache.set(key, { value, expiresAt });
  }

  async del(key: string): Promise<void> {
    this.memoryCache.delete(key);
  }

  async flush(): Promise<void> {
    this.memoryCache.clear();
  }
}
