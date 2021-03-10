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
  user: User;
  error: [Error];
};

@InputType()
class UserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("input") userInput: UserInput,
    @Ctx() { em }: SnuberContext
  ): Promise<User> {
    const { username, password } = userInput;
    const hashedPassword = await hash(password);
    const user = em.create(User, { username, password: hashedPassword });
    await em.persistAndFlush(user);
    return user;
  }
  @Query(() => String)
  hello(): string {
    return "hello";
  }
}
