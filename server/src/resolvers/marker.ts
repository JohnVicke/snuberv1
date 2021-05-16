import { Marker } from '../entities/Marker';
import { isAuth } from '../middleware/isAuth';
import { SnuberContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';

@InputType()
class MarkerInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  title: string;
}

@ObjectType()
class MarkerError {
  @Field()
  type: string;

  @Field()
  message: String;
}

@ObjectType()
class MarkerResponse {
  @Field(() => Marker, { nullable: true })
  marker?: Marker;

  @Field(() => [MarkerError], { nullable: true })
  errors?: MarkerError[];
}

@Resolver(Marker)
export class MarkerResolver {
  @Mutation(() => MarkerResponse)
  @UseMiddleware(isAuth)
  async createMarker(
    @Arg('options') options: MarkerInput,
    @Ctx() { req }: SnuberContext
  ): Promise<MarkerResponse> {
    const userHasMarker = await Marker.findOne({
      creatorId: req.session.userId
    });
    console.log('user has marker', userHasMarker);
    if (userHasMarker) {
      return {
        errors: [
          {
            type: 'already_exists',
            message: 'Du har redan ett nödanrop uppe!'
          }
        ]
      };
    }

    const marker = await Marker.create({
      ...options,
      creatorId: req.session.userId
    }).save();

    return { marker };
  }

  @Query(() => [Marker])
  @UseMiddleware(isAuth)
  markers(): Promise<Marker[]> {
    return Marker.find();
  }
}
