import "server-only";

import type { ApiMedia } from "../../base-api";

/** A post as `/blog/public` returns it. */
export interface ApiPost {
  _id: string;
  slug: string;
  title: string;
  titleBn?: string;
  excerpt?: string;
  excerptBn?: string;
  content?: string;
  contentBn?: string;
  category?: { name?: string } | string | null;
  tags?: string[];
  coverImage?: ApiMedia;
  author?: {
    name?: string;
    nameBn?: string;
    role?: string;
    roleBn?: string;
    avatar?: ApiMedia;
  } | null;
  readMinutes?: number;
  publishedAt?: string;
  featured?: boolean;
  trending?: boolean;
}
