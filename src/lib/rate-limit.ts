type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type ConsumeRateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
  now?: number;
  store?: Map<string, RateLimitBucket>;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: Date;
  retryAfterSeconds: number;
};

const defaultStore = new Map<string, RateLimitBucket>();

export function consumeRateLimit({
  key,
  limit,
  windowMs,
  now = Date.now(),
  store = defaultStore,
}: ConsumeRateLimitOptions): RateLimitResult {
  const existingBucket = store.get(key);
  const bucket =
    existingBucket && existingBucket.resetAt > now
      ? existingBucket
      : {
          count: 0,
          resetAt: now + windowMs,
        };

  bucket.count += 1;
  store.set(key, bucket);

  const remaining = Math.max(0, limit - bucket.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining,
    resetAt: new Date(bucket.resetAt),
    retryAfterSeconds,
  };
}

export function getClientRateLimitKey(request: Request, scope: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const clientId = forwardedFor || realIp || "anonymous";

  return `${scope}:${clientId}`;
}
