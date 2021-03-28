import { SnuberContext } from 'src/types';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<SnuberContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('not authenticated');
  }
  return next();
};
