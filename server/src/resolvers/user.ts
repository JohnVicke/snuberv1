import { User } from '../entities/User';
import { SnuberContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';
import argon2 from 'argon2';
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants';
import { UserInput } from './UserInput';
import { validateRegister } from '../utils/validateRegister';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { em, redis }: SnuberContext
  ) {
    const user = await em.findOne(User, { email });
    if (!user) {
      // return true for security reasons
      return true;
    }

    const token = v4();
    await redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 3
    );

    const html = `<a href="http://localhost:3000/change-password/${token}">Reset your password</a>`;
    await sendEmail(email, html);
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { em, redis, req }: SnuberContext
  ): Promise<UserResponse> {
    if (newPassword.length < 3) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'Length of password must be greater than 3'
          }
        ]
      };
    }

    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'Token expired'
          }
        ]
      };
    }

    const user = await em.findOne(User, { id: parseInt(userId) });

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'User no longer exists'
          }
        ]
      };
    }

    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;
    em.persistAndFlush(user);

    req.session.userId = user.id;
    redis.del(key);

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('input') userInput: UserInput,
    @Ctx() { em, req }: SnuberContext
  ): Promise<UserResponse> {
    const { username, password, displayName, email } = userInput;
    const errors = validateRegister(userInput);
    if (errors) return { errors };

    const userExists = await em.findOne(User, { username });
    if (userExists) {
      return {
        errors: [
          {
            field: 'username',
            message: 'User already exists'
          }
        ]
      };
    }
    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, {
      username,
      password: hashedPassword,
      displayName: displayName,
      email
    });
    await em.persistAndFlush(user);
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { em, req }: SnuberContext
  ): Promise<UserResponse> {
    const where = usernameOrEmail.includes('@')
      ? {
          email: usernameOrEmail
        }
      : {
          username: usernameOrEmail
        };

    const user = await em.findOne(User, where);

    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'User does not exist!'
          }
        ]
      };
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect password!'
          }
        ]
      };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: SnuberContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    return em.findOne(User, { id: req.session.userId });
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: SnuberContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
