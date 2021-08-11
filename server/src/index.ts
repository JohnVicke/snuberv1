import 'reflect-metadata';
import 'dotenv-safe/config';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { graphqlUploadExpress } from 'graphql-upload';

import express from 'express';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import path from 'path';

import {
  __prod__,
  PORT,
  REDIS_SECRET,
  COOKIE_NAME,
  AWS_S3_UPLOAD_CONFIG
} from './constants';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MarkerResolver } from './resolvers/marker';
import { SnuberContext } from './types';
import { createUserLoader } from './utils/createUserLoader';
import { createUpdootLoader } from './utils/createUpdootLoader';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Marker } from './entities/Marker';
import { Updoot } from './entities/Updoot';
import { Friends } from './entities/Friends';
import { FriendsResolver } from './resolvers/friends';
import { S3FileManager } from './utils/s3';

(async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    entities: [User, Post, Updoot, Marker, Friends],
    migrations: [path.join(__dirname, './migrations/*')]
  });
  // await connection.runMigrations();
  // await Post.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  // nginx proxy
  app.set('proxy', 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax',
        domain: __prod__ ? '.viktormalmedal.com' : undefined
      },
      secret: REDIS_SECRET,
      resave: false
    })
  );

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

  const apolloServer = new ApolloServer({
    uploads: false,
    schema: await buildSchema({
      resolvers: [MarkerResolver, UserResolver, PostResolver, FriendsResolver],
      validate: false
    }),

    context: ({ req, res }): SnuberContext => ({
      req,
      res,
      redis,
      s3: new S3FileManager(AWS_S3_UPLOAD_CONFIG),
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader()
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(typeof PORT === 'string' ? parseInt(PORT) : PORT, () => {
    console.log(`server started on port:${PORT}`);
  });
})().catch((error) => {
  console.error(error);
});
