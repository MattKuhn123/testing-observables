import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCurrentComponent } from './app.current.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { LocalSessionService } from '../../../services/local-session.service';

describe('AppCurrentComponent', () => {
  let component: AppCurrentComponent;
  let fixture: ComponentFixture<AppCurrentComponent>;

  const sites = [
    { siteName: "Reservoir_1", siteId: 1 },
    { siteName: "Reservoir_2", siteId: 2 },
    { siteName: "Reservoir_3", siteId: 3 },
  ];

  const sessions = [
    { site: sites[0], crewLeader: "CrewLeader_1" },
    { site: sites[1], crewLeader: "CrewLeader_2" }
  ];

  const mockSessionSvc: Partial<LocalSessionService> = {
    getSession(site) {
      if (!site)
        return of();

      return of(sessions.find(x => x.site.siteName === site.siteName && x.site.siteId === site.siteId))
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppCurrentComponent, FormsModule, ReactiveFormsModule, ],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LocalSessionService, useValue: mockSessionSvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCurrentComponent);
    component = fixture.componentInstance;
    component.sites = sites;
    fixture.detectChanges();
  });

  const getSelectElement = (): DebugElement => fixture.debugElement.query(By.css("select"));
  const getOptions = (): DebugElement[] => getSelectElement().queryAll(By.css("option"));

  const changeTo = (siteId: number): void => {
    const siteSelect = getSelectElement();
    const options = getOptions();
    siteSelect.nativeElement.value = options.find(x => x.nativeNode.value == siteId)!.nativeElement.value;
    siteSelect.nativeElement.dispatchEvent(new Event("change"));
  }
  
  it("should set the session according the site selected", () => {
    const toSite = sites[0];
    const expected = sessions.find(x => x.site.siteId === toSite.siteId)!.crewLeader;
    
    changeTo(toSite.siteId);
    const actual = fixture.debugElement.query(By.css("input")).nativeElement.value; 
    expect(actual).toBe(expected);
  });
});
