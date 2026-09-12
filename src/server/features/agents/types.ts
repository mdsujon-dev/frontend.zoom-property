import "server-only";
import type { ApiMedia } from "../../base-api";

export interface ApiAgent {
  _id: string;
  name: string;
  nameBn?: string;
  role: string;
  roleBn?: string;
  patch: string[];
  deals: number;
  rating: number;
  respondsIn: number;
  languages: string[];
  image?: ApiMedia;
  isDeleted?: boolean;
}
