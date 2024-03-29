import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => String, { nullable: true })
  displayName: string;

  @Field()
  email: string;

  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload;
}
