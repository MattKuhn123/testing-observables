import { Injectable } from '@angular/core';
import { SSFSite } from '../models/ssf-site.model';
import { SSFSession } from '../models/ssf-session.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalSessionService {

  constructor(private httpClient: HttpClient) { }

  getSession(site: SSFSite | undefined): Observable<SSFSession | undefined> {
    if (!site) {
      return of();
    }

    return this.httpClient.get("/sessions.json").pipe(
      map(x => x as SSFSession[]),
      map(sessions => sessions.find(x => x.site.siteName === site.siteName && x.site.siteId === site.siteId))
    )
  }
}
