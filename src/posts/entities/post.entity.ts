/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field()
  title: string;
  content?: string;
  published?: boolean;
  authorId?: number;
  // author    User?    @relation(fields: [authorId], references: [id])
}
