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
import path from 'path';
import passport from 'passport';
import { SnapchatProfile } from 'passport-snapchat/lib/src/profile';
const SnapchatStrategy = require('passport-snapchat').Strategy;

import { __prod__, PORT, REDIS_SECRET, COOKIE_NAME } from './constants';
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

(async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [User, Post, Updoot, Marker, Friends],
    migrations: [path.join(__dirname, './migrations/*')]
  });

  passport.use(
    new SnapchatStrategy(
      {
        clientID: process.env.SNAPCHAT_CLIENT_ID,
        clientSecret: process.env.SNAPCHAT_CLIENT_SECRET,
        callbackURL: 'http://localhost:42069/login/snapchat/callback',
        profileFields: ['id', 'displayName', 'bitmoji'],
        scope: ['user.display_name', 'user.bitmoji.avatar'],
        pkce: true,
        state: true
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: SnapchatProfile,
        cb: any
      ) => {
        // In this example, the user's Snapchat profile is supplied as the user
        // record.  In a production-quality application, the Snapchat profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authorization with other identity
        // providers.
        return cb(null, profile);
      }
    )
  );
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
  });

  //await connection.runMigrations();
  //await Post.delete({});

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

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login/snapchat', passport.authenticate('snapchat'));

  app.get(
    '/login/snapchat/callback',
    passport.authenticate('snapchat', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    }
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MarkerResolver, UserResolver, PostResolver, FriendsResolver],
      validate: false
    }),

    context: ({ req, res }): SnuberContext => ({
      req,
      res,
      redis,
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
