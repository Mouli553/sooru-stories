type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitRecord>();

/**
 * Safely extracts the real client IP address even when behind multiple reverse proxies (Vercel, Cloudflare, AWS).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp && realIp.trim()) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * In-memory sliding window rate limiter
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimits.get(key);

  if (!record || now > record.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up expired entries every 60 seconds
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimits.entries()) {
      if (now > record.resetAt) {
        rateLimits.delete(key);
      }
    }
  }, 60000);
}
