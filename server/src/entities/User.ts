import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  // username is users "account name", used for loggin in
  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  // displayname is what is shown to other users. Should be able to do namechanges
  @Field()
  @Property({ type: 'text' })
  displayName!: string;

  @Field()
  @Property({ type: 'text' })
  password!: string;
}
