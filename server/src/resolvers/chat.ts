import {
  Args,
  Field,
  InputType,
  ObjectType,
  Root,
  Subscription
} from 'type-graphql';

@InputType()
class NewMessageArgs {
  @Field()
  test: string;
}

@InputType()
class NewMessagePayload {
  @Field()
  test: string;
}

@ObjectType()
class ChatMessageResponse {
  @Field()
  test2: string;

  @Field()
  date: string;
}

export class ChatResolver {
  // ...
  @Subscription({
    topics: 'NOTIFICATIONS',
    filter: ({ payload, args }) => args.priorities.includes(payload.priority)
  })
  newChatMessage(
    @Root() notificationPayload: NewMessagePayload,
    @Args() args: NewMessageArgs
  ): Promise<ChatMessageResponse> {
    return new Promise((res, _) => {
      res({
        test2: 'string',
        date: 'string'
      });
    });
  }
}
