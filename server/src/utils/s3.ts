import 'dotenv-safe/config';
import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { FileUpload } from 'graphql-upload';
import { v4 } from 'uuid';
import { extname } from 'path';

const uploadConfig = {
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  region: process.env.AWS_S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

AWS.config.update(uploadConfig);

const s3 = new AWS.S3();

export const uploadImage = ({
  createReadStream,
  filename,
  mimetype
}: FileUpload) => {
  const uploadParams: PutObjectRequest = {
    Bucket: uploadConfig.Bucket,
    Body: createReadStream(),
    Key: `${v4()}${extname(filename)}`,
    ContentType: mimetype
  };

  return s3.upload(uploadParams).promise();
};

export const getImage = (Key: string) => {
  return s3
    .getObject({
      Bucket: uploadConfig.Bucket,
      Key
    })
    .promise();
};
