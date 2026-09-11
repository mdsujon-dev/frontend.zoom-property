"use server";

import { baseApi } from "../../base-api";

export async function submitBlogComment(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const payload = {
    post: data.postId,
    name: data.name,
    email: data.email,
    content: data.content,
  };

  const response = await baseApi.post("blog-comments", payload);

  if (!response?.success) {
    return { success: false, error: response?.message || "Something went wrong" };
  }

  return { success: true };
}
