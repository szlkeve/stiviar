import { renderHook, waitFor } from "@testing-library/react";

import { register } from "../../index";
import {
  CategoriesSchema,
  Category,
  CategorySchema,
  CommentsSchema,
  Post,
  PostComment,
  PostCommentsSchema,
  PostSchema,
  PostsSchema,
  User,
  UsersSchema,
} from "./types";

const apiKey = process.env.MOCKAPI_KEY;
const BASE_URL = `https://${apiKey}.mockapi.io/api/`;
export const api = register<{
  categories: { type: Category[] };
  category: { type: Category; params: { id: string } };
  users: { type: User[] };
  posts: { type: Post[] };
  post: { type: Post; params: { id: string } };
  postComments: { type: PostComment[]; params: { postId: string } };
}>({
  categories: {
    url: `${BASE_URL}/categories`,
    schema: CategoriesSchema,
  },
  category: {
    url: (p) => `${BASE_URL}/categories/${p.id}`,
    schema: CategorySchema,
  },
  users: { url: `${BASE_URL}/users`, schema: UsersSchema },
  posts: { url: `${BASE_URL}/posts`, schema: PostsSchema },
  post: {
    url: (p) => `${BASE_URL}/posts/${p.id}`,
    schema: PostSchema,
  },
  postComments: {
    url: (p) => `${BASE_URL}/posts/${p.postId}/comments`,
    schema: PostCommentsSchema,
  },
});

 const useFetch = api.useFetch;

describe("integration tests", () => {
  it("sets the correct value", async () => {
    const { result } = renderHook(() => useFetch("category", { id: "1" }));
    expect(result.current.data).toBe(undefined);
    await waitFor(() => {
      expect(result.current.data).toEqual({
        name: "Clark Skiles Jr.",
        slug: "Investor Functionality Planner",
        id: "1",
      });
    });
  });
});
