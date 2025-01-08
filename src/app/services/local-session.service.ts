import { Injectable } from '@angular/core';
import { SSFSite } from '../models/ssf-site.model';
import { SSFSession } from '../models/ssf-session.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalSessionService {

  constructor(private httpClient: HttpClient) { }

  getSession(station: SSFSite): Observable<SSFSession | undefined> {
    return this.httpClient.get("/sessions.json").pipe(
      map(x => x as SSFSession[]),
      map(sessions => sessions.find(x => x.station.siteName === station.siteName && x.station.siteId === station.siteId))
    )
  }
}
