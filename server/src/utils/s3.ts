import 'dotenv-safe/config';
import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { FileUpload } from 'graphql-upload';
import { v4 } from 'uuid';
import { extname } from 'path';

export type AWSConfig = {
  Bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  signatureVersion: string;
};

export class S3FileManager {
  private S3: AWS.S3;
  private config: AWSConfig;

  constructor(config: AWSConfig) {
    AWS.config.update(config);
    this.S3 = new AWS.S3();
    this.config = config;
  }

  uploadImage(file: FileUpload): Promise<AWS.S3.ManagedUpload.SendData> {
    const { createReadStream, filename, mimetype } = file;
    const params: PutObjectRequest = {
      Bucket: this.config.Bucket,
      Body: createReadStream(),
      Key: `snuber-${v4()}${extname(filename)}`,
      ContentType: mimetype
    };
    return this.S3.upload(params).promise();
  }

  getSignedUrl(Key: string) {
    return this.S3.getSignedUrlPromise('getObject', {
      Bucket: this.config.Bucket,
      Key
    });
  }
}
