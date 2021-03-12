import { User } from "../entities/User";
import { SnuberContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { hash } from "argon2";

type Error = {
  field: string;
  message: string;
};

type UserResponse = {
  user?: User;
  error?: [Error];
};

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  displayName: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("input") userInput: UserInput,
    @Ctx() { em }: SnuberContext
  ): Promise<UserResponse> {
    const { username, password, displayName } = userInput;
    // TODO: Add better validation, check libraries. Also refactor.
    if (username.length < 3) {
      return {
        error: [
          {
            field: "username",
            message: "Lenght of username must be greater than 3",
          },
        ],
      };
    }
    if (password.length < 3) {
      return {
        error: [
          {
            field: "password",
            message: "Length of password must be greater than 3",
          },
        ],
      };
    }
    const userExists = !!(await em.find(User, { username }));
    if (userExists) {
      return {
        error: [
          {
            field: "username",
            message: "User already exists",
          },
        ],
      };
    }
    const hashedPassword = await hash(password);
    const user = em.create(User, {
      username,
      password: hashedPassword,
      displayName,
    });
    await em.persistAndFlush(user);
    return { user };
  }
  @Query(() => String)
  hello(): string {
    return "hello";
  }
}
