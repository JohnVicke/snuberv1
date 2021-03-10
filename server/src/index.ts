import "reflect-metadata";
import "dotenv-safe/config";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mikroConfig from "./mikro-orm.config";
import express from "express";

import { __prod__, PORT } from "./constants";
import { UserResolver } from "./resolvers/user";

(async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const app = express();
  app.listen(PORT, () => {
    console.log(`server started on port:${PORT}`);
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      em: orm.em,
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app });
})().catch((error) => {
  console.error(error);
});
