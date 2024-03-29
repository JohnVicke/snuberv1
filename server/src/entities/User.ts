import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Marker } from './Marker';
import { Post } from './Post';
import { Updoot } from './Updoot';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
  // username is users "account name", used for loggin in
  @Field()
  @Column({ unique: true })
  username!: string;

  // displayname is what is shown to other users. Should be able to do namechanges
  @Field()
  @Column()
  displayName!: string;

  @Field()
  @Column({ nullable: true })
  avatarId?: string;

  @Field()
  @Column({ nullable: true })
  avatarSignedUrl?: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field(() => [Marker])
  @OneToMany(() => Marker, (marker) => marker.creator)
  markers: Marker[];

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();
}
