import { Friends } from '../entities/Friends';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { SnuberContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Int,
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
    @Arg('friendsId', () => Int) id: number,
    @Ctx() { req }: SnuberContext
  ) {
    if (!answer) {
      await Friends.delete({ fromUserId: id });
    } else {
      await getConnection()
        .createQueryBuilder()
        .update(Friends)
        .set({ status: Status.ACCEPTED })
        .where('"fromUserId" = :id', { id })
        .andWhere('"toUserId" = :id', { id: req.session.userId })
        .execute();
    }
    return true;
  }

  @Query(() => [FriendRequestResponse])
  @UseMiddleware(isAuth)
  async incomingFriendRequests(
    @Ctx() { req }: SnuberContext
  ): Promise<FriendRequestResponse[]> {
    const replacements: any[] = [req.session.userId, Status.PENDING];
    const incomingRequests = await getConnection().query(
      `
      select * from "friends" as f
        inner join "user" as u
        on u.id = f."fromUserId"
      where f."toUserId" = $1 and f.status = $2
      `,
      replacements
    );
    return incomingRequests;
  }

  @Query(() => [FriendRequestResponse])
  @UseMiddleware(isAuth)
  async outgoingFriendRequests(
    @Ctx() { req }: SnuberContext
  ): Promise<FriendRequestResponse[]> {
    const replacements: any[] = [req.session.userId, Status.PENDING];
    const outgoingRequests = await getConnection().query(
      `
      select * from "friends" as f
        inner join "user" as u
        on u.id = f."toUserId"
      where f."fromUserId" = $1 and f.status = $2
      `,
      replacements
    );
    return outgoingRequests;
  }

  @Query(() => [Friend])
  @UseMiddleware(isAuth)
  async friends(@Ctx() { req }: SnuberContext): Promise<Friend[]> {
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
