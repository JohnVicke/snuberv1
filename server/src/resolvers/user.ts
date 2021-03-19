import { User } from "../entities/User";
import { SnuberContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@ObjectType() 
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
};

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(()=> User, {nullable: true})
  user?: User;
}

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => String, {nullable: true})
  displayName?: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") userInput: UserInput,
    @Ctx() { em }: SnuberContext
  ): Promise<UserResponse> {
    const { username, password, displayName } = userInput;
    // TODO: Add better validation, check libraries. Also refactor.
    if (username.length < 3) {
      return {
        errors: [
          {
            field: "username",
            message: "Lenght of username must be greater than 3",
          },
        ],
      };
    }
    if (password.length < 3) {
      return {
        errors: [
          {
            field: "password",
            message: "Length of password must be greater than 3",
          },
        ],
      };
    }
    const userExists = !(await em.find(User, { username }));
    if (userExists) {
      return {
        errors: [
          {
            field: "username",
            message: "User already exists",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, {
      username,
      password: hashedPassword,
      displayName,
    });
    await em.persistAndFlush(user);
    return { user };
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("input") userInput: UserInput,
    @Ctx() { em }: SnuberContext
  ): Promise<UserResponse> {

    const { username, password } = userInput;
    const user = await em.findOne(User, {username});

    if(!user) {
      return {
        errors: [
          {
            field: "user",
            message: "User does not exist!"
          }
        ]
      }
    }

    const validPassword = await argon2.verify(user.password, password);

    if(!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password!"
          }
        ]
      }
    }

    return {user};
  }
 
  @Query(() => String)
  hello(): string {
    return "hello";
  }
}
