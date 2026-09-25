import { z } from "zod";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export const CategorySchema: z.ZodType<Category> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});
export const CategoriesSchema = z.array(CategorySchema);

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export const UserSchema: z.ZodType<User> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string(),
});
export const UsersSchema = z.array(UserSchema);

export type Post = {
  id: string;
  title: string;
  body: string;
  userId: number;
  categoryId: number;
  published: boolean;
  createdAt: string;
};

export const PostSchema: z.ZodType<Post> = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
  categoryId: z.number(),
  published: z.boolean(),
  createdAt: z.string(),
});
export const PostsSchema = z.array(PostSchema);

export type Comment = {
  id: string;
  postId: string;
  author: string;
  text: string;
};

export const CommentSchema: z.ZodType<Comment> = z.object({
  id: z.string(),
  postId: z.string(),
  author: z.string(),
  text: z.string(),
});
export const CommentsSchema = z.array(CommentSchema);

export type PostComment = {
  id: string;
  postId: string;
  author: string;
  text: string;
};

export const PostCommentSchema: z.ZodType<PostComment> = z.object({
  id: z.string(),
  postId: z.string(),
  author: z.string(),
  text: z.string(),
});

export const PostCommentsSchema = z.array(PostCommentSchema);
