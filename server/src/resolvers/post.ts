import { isAuth } from '../middleware/isAuth';
import { SnuberContext } from 'src/types';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  UseMiddleware,
  Ctx
} from 'type-graphql';
import { Post } from '../entities/Post';

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  type: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('options') options: PostInput,
    @Ctx() { req }: SnuberContext
  ): Promise<Post> {
    return Post.create({ ...options, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Post | undefined> {
    const post = await Post.findOne(id);
    if (!post) {
      return undefined;
    }
    if (typeof title !== 'undefined') {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
