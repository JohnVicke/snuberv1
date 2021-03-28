import 'reflect-metadata';
import 'dotenv-safe/config';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import {
  __prod__,
  PORT,
  REDIS_SECRET,
  COOKIE_NAME,
  DB_USER,
  DB_PASSWORD
} from './constants';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { SnuberContext } from './types';
import { User } from './entities/User';
import { Post } from './entities/Post';

(async () => {
  const connection = await createConnection({
    type: 'postgres',
    database: 'snuber-v2',
    username: DB_USER,
    password: DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User, Post]
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.listen(PORT, () => {
    console.log(`server started on port:${PORT}`);
  });

  app.use(
    cors({
      origin: 'http://localhost:3000',
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
        sameSite: 'lax'
      },
      secret: REDIS_SECRET,
      resave: false
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false
    }),
    context: ({ req, res }): SnuberContext => ({
      req,
      res,
      redis
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });
})().catch((error) => {
  console.error(error);
});
