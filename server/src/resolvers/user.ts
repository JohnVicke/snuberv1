import { User } from '../entities/User';
import { SnuberContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';

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

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => String, { nullable: true })
  displayName?: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input') userInput: UserInput,
    @Ctx() { em, req }: SnuberContext
  ): Promise<UserResponse> {
    const { username, password, displayName } = userInput;
    // TODO: Add better validation, check libraries. Also refactor.
    if (username.length < 3) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Lenght of username must be greater than 3'
          }
        ]
      };
    }
    if (password.length < 3) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Length of password must be greater than 3'
          }
        ]
      };
    }
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
      displayName
    });
    await em.persistAndFlush(user);
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') userInput: UserInput,
    @Ctx() { em, req }: SnuberContext
  ): Promise<UserResponse> {
    const { username, password } = userInput;
    const user = await em.findOne(User, { username });

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
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
