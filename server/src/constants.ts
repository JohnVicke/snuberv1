import { AWSConfig } from './utils/s3';

export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || 4000;
export const REDIS_SECRET = process.env.REDIS_SECRET!;
export const COOKIE_NAME = 'qid';
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const FORGOT_PASSWORD_PREFIX = 'forget-password:';
export const AWS_S3_UPLOAD_CONFIG: AWSConfig = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  region: process.env.AWS_S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
