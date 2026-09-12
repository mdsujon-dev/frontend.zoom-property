import "server-only";
import { type Agent } from "@/data/people";

import { mediaUrl } from "../../base-api";
import type { ApiAgent } from "./types";

export function toAgent(api: ApiAgent): Agent {
  return {
    id: api._id,
    name: api.name,
    role: api.role,
    patch: api.patch || [],
    deals: api.deals || 0,
    rating: api.rating || 5,
    respondsIn: api.respondsIn || 15,
    image: mediaUrl(api.image),
    languages: api.languages || ["English", "Bengali"],
  };
}
