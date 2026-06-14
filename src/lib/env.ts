import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().optional(),
});

export const env = envSchema.safeParse(process.env);

export function getPublicAppUrl() {
  if (env.success && env.data.NEXT_PUBLIC_APP_URL) {
    return env.data.NEXT_PUBLIC_APP_URL;
  }

  return "http://localhost:3000";
}
