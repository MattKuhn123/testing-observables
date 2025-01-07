import { Injectable } from '@angular/core';
import { SSFSite } from './ssf-site.model';
import { Observable, of } from 'rxjs';
import { SSFSession } from './ssf-session.model';

@Injectable({
  providedIn: 'root'
})
export class LocalSessionService {

  sessions: SSFSession[] = [
    {
      station: {
        siteName: "Reservoir_1",
        siteId: 1
      },
      crewLeader: "CrewLeader_1"
    },
    {
      station: {
        siteName: "Reservoir_2",
        siteId: 2
      },
      crewLeader: "CrewLeader_2"
    }
  ]

  constructor() { }

  getSession(station: SSFSite): Observable<SSFSession | undefined> {
    return of(this.sessions.find(x => x.station.siteName === station.siteName && x.station.siteId === station.siteId));
  }
}
