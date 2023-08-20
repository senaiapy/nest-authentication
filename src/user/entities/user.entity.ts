/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  email: string;
  username?: string;
  password?: string;
  //posts: string[];
}
