export const __prod__ = process.env.NODE_ENV === "production";
export const PORT = process.env.PORT || 4000;
export const REDIS_SECRET = process.env.REDIS_SECRET!;
