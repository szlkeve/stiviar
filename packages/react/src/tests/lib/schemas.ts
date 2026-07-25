import { z } from "zod";
import { User } from "./types";

export const UserSchema: z.ZodType<User> = z.object({
  id: z.number(),
  name: z.string(),
});
