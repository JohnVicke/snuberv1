import argon2 from 'argon2';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { uploadImage } from '../utils/s3';
import { SnuberContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';

import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants';
import { User } from '../entities/User';
import { sendEmail } from '../utils/sendEmail';
import { validateRegister } from '../utils/validateRegister';
import { UserInput } from './UserInput';

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

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: SnuberContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }
    return '';
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: SnuberContext
  ) {
    const user = await User.findOne({ where: email });
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
    @Ctx() { redis, req }: SnuberContext
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

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

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

    await User.update(
      { id: userIdNum },
      { password: await argon2.hash(newPassword) }
    );

    req.session.userId = user.id;
    redis.del(key);

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('input') userInput: UserInput,
    @Ctx() { req }: SnuberContext
  ): Promise<UserResponse> {
    const { username, password, displayName, email } = userInput;
    const errors = validateRegister(userInput);
    if (errors) return { errors };

    const hashedPassword = await argon2.hash(password);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username,
          password: hashedPassword,
          displayName: displayName,
          email
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.code === '23505')
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken'
            }
          ]
        };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: SnuberContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? {
            where: { email: usernameOrEmail }
          }
        : {
            where: { username: usernameOrEmail }
          }
    );

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
  me(@Ctx() { req }: SnuberContext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
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

  @Mutation(() => Boolean)
  async testUpoadFile(
    @Ctx() { req }: SnuberContext,
    @Arg('file', () => GraphQLUpload)
    file: FileUpload
  ) {
    const { Location } = await uploadImage(file);
    return {
      Location
    };
  }
}
