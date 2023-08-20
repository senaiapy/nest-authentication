export class CreatePostDto {
  title: string;
  content?: string;
  published?: boolean;
  authorId?: number;
  // author    User?    @relation(fields: [authorId], references: [id])
}
