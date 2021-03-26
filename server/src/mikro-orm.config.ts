import 'dotenv-safe/config';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { DB_PASSWORD, DB_USER, __prod__ } from './constants';
import { User } from './entities/User';

export default {
  entities: [User],
  dbName: 'snuber',
  type: 'postgresql',
  debug: !__prod__,
  user: DB_USER,
  password: DB_PASSWORD,
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  }
} as Parameters<typeof MikroORM.init>[0];
