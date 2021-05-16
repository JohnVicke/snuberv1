import { Field, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

export enum Status {
  PENDING = 'pending',
  ACCEPTED = 'accepted'
}

registerEnumType(Status, { name: 'status' });

@ObjectType()
@Entity()
export class Friends extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @OneToMany(() => User, (user) => user.id)
  toUser!: User;

  @Field(() => User)
  @OneToMany(() => User, (user) => user.id)
  fromUser: User;

  @Field()
  @Column()
  fromUserId!: number;

  @Field()
  @Column()
  toUserId!: number;

  @Field(() => Status)
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status!: Status;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
