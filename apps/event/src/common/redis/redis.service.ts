import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(key: string, value: string, expireSec?: number) {
    await this.redis.set(key, value);
    if (expireSec) {
      await this.redis.expire(key, expireSec);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }
}
