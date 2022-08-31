import 'dotenv/config';
import { AppDataSource } from './data-source';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from './userResolver';
import { buildSchema } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './utils/auth';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sendRefreshToken } from './utils/sendRefreshToken';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(
      cors({
        origin: 'http://localhost:8080',
        credentials: true,
      })
    );
    app.use(cookieParser());
    app.post('/refresh', async (req, res) => {
      const token = req.cookies.jid;

      if (!token) {
        return res.send({ ok: false, accessToken: '' });
      }

      let payload: any = null;
      try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
      } catch (err) {
        return res.send({ ok: false, accessToken: '' });
      }

      const user = await User.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        return res.send({ ok: false, accessToken: '' });
      }

      // if (user.tokenVersion !== payload.tokenVersion) {
      //   return res.send({ ok: false, accessToken: '' });
      // }

      sendRefreshToken(res, createRefreshToken(user));

      return res.send({ ok: true, accessToken: createAccessToken(user) });
    });
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        if (error && error.extensions) {
          error.extensions.code = 'GRAPHQL_VALIDATION_FAILED';
        }
        console.log('error', error);
        return error;
      },

      csrfPrevention: true,
      context: ({ req, res }) => ({
        req,
        res,
      }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
      app,
      cors: false,
    });
    app.listen(4000, () => {
      console.log('express server started');
    });
  })
  .catch((error) => console.log(error));
