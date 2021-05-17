import { Friends } from '../entities/Friends';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { SnuberContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { Status } from '../entities/Friends';
import { getConnection } from 'typeorm';

@ObjectType()
class Friend {
  @Field()
  displayName: string;

  @Field()
  id: number;
}

@Resolver(Friends)
export class FriendsResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendFriendRequest(
    @Arg('username') username: string,
    @Ctx() { req }: SnuberContext
  ) {
    const toUser = await User.findOne({ username });
    if (!toUser) {
      return false;
    }

    await Friends.create({
      toUserId: toUser.id,
      fromUserId: req.session.userId
    }).save();

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async answerFriendRequest(
    @Arg('answer') answer: boolean,
    @Arg('friendsId') id: number
  ) {
    if (!answer) {
      await Friends.delete(id);
    } else {
      await Friends.update({ id }, { status: Status.ACCEPTED });
    }
    // Failed successfully
    return true;
  }

  @Query(() => [Friends])
  @UseMiddleware(isAuth)
  async incomingFriendRequests(
    @Ctx() { req }: SnuberContext
  ): Promise<Friends[]> {
    return Friends.find({
      toUserId: req.session.userId,
      status: Status.PENDING
    });
  }

  @Query(() => [Friend])
  @UseMiddleware(isAuth)
  async friends(@Ctx() { req }: SnuberContext): Promise<Friend> {
    const replacements: any[] = [req.session.userId, Status.ACCEPTED];
    const friends = await getConnection().query(
      `
      select "displayName", "id" from "user" where id in 
	      (select case when "toUserId" = $1 	
		      then "fromUserId" 
		      else "toUserId"
		      end as "friendId"
	      from friends where status = $2)
      `,
      replacements
    );
    return friends;
  }
}
