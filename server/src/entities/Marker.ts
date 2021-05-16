import { Field, Float, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Marker extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Float)
  @Column({ type: 'float' })
  latitude!: number;

  @Field(() => Float)
  @Column({ type: 'float' })
  longitude!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.markers)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
