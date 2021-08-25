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
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
class MarkerInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  title: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image: FileUpload;
}

@ObjectType()
class MarkerError {
  @Field()
  type: string;

  @Field()
  message: String;
}

@ObjectType()
class LatLng {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}

@ObjectType()
class SnuberMarker {
  @Field()
  id: number;

  @Field()
  creatorId: number;

  @Field()
  title: string;

  @Field(() => LatLng)
  latLng: LatLng;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  imageSignedUrl?: string;
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
    @Arg('options') { image, ...options }: MarkerInput,
    @Ctx() { req, s3 }: SnuberContext
  ): Promise<MarkerResponse> {
    const userHasMarker = await Marker.findOne({
      creatorId: req.session.userId
    });

    if (!!userHasMarker) {
      return {
        errors: [
          {
            type: 'already_exists',
            message: 'Du har redan ett nödanrop uppe idiot!'
          }
        ]
      };
    }

    let imageSignedUrl, imageId;
    if (image) {
      imageId = (await s3.uploadImage(await image)).Key;
      imageSignedUrl = await s3.getSignedUrl(imageId);
    }

    const marker = await Marker.create({
      ...options,
      creatorId: req.session.userId,
      imageSignedUrl
    }).save();

    return { marker };
  }

  @Query(() => [SnuberMarker])
  @UseMiddleware(isAuth)
  async markers(): Promise<SnuberMarker[]> {
    const markers = await Marker.find();
    const snuberMarkers = markers.map((marker: Marker): SnuberMarker => {
      const {
        id,
        creatorId,
        title,
        updatedAt,
        latitude,
        longitude,
        imageSignedUrl
      } = marker;
      return {
        id,
        creatorId,
        title,
        updatedAt,
        imageSignedUrl,
        latLng: {
          latitude,
          longitude
        }
      };
    });
    return snuberMarkers;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeMarker(@Ctx() { req }: SnuberContext): Promise<boolean> {
    await Marker.delete({ creatorId: req.session.userId });
    return true;
  }
}
