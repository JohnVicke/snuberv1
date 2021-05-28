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

@ObjectType()
class FriendRequestResponse {
  @Field()
  displayName: string;

  @Field(() => String)
  updatedAt: Date;

  @Field()
  id: number;

  @Field()
  status: Status;
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
      await Friends.update({ fromUserId: id }, { status: Status.ACCEPTED });
    }
    return true;
  }

  @Query(() => [FriendRequestResponse])
  @UseMiddleware(isAuth)
  async incomingFriendRequests(
    @Ctx() { req }: SnuberContext
  ): Promise<FriendRequestResponse[]> {
    console.log(req.session.userId);
    const replacements: any[] = [req.session.userId, Status.PENDING];
    // TODO fix: sends all friend requests in the database....
    const requests = await getConnection().query(
      `
      select u."displayName", f."updatedAt", f."status", u.id from "user" as u
      inner join "friends" as f
      on f."toUserId" = $1 and f.status = $2
      `,
      replacements
    );
    return requests;
  }

  @Query(() => [Friend])
  @UseMiddleware(isAuth)
  async friends(@Ctx() { req }: SnuberContext): Promise<Friend[]> {
    const replacements: any[] = [req.session.userId, Status.ACCEPTED];
    console.log(req.session.userId);
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
