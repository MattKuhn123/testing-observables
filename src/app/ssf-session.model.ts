import { SSFSite } from "./ssf-site.model"

export type SSFSession = {
  station: SSFSite;
  crewLeader: string;
}