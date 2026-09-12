import "server-only";

import { agents as fallback, type Agent } from "@/data/people";
import { createResource } from "../../base-api";
import { toAgent } from "./mapper";
import type { ApiAgent } from "./types";

const agentsResource = createResource<ApiAgent, Agent>({
  path: "agents",
  tag: "zp:agents",
  map: toAgent,
  fallback,
});

export async function getAgents(): Promise<Agent[]> {
  return agentsResource.list({
    limit: 100,
    sort: "-deals",
  });
}
