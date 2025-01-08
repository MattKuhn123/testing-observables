import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCurrentComponent } from './app.current.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppCurrentComponent;
  let fixture: ComponentFixture<AppCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppCurrentComponent, FormsModule, ReactiveFormsModule, ],
      providers:[ provideHttpClient(), provideHttpClientTesting() ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getSelectElement = (): DebugElement => fixture.debugElement.query(By.css("select"));
  const getOptions = (): DebugElement[] => getSelectElement().queryAll(By.css("option"));
  
  it("should set the session according the station selected", async () => {
    debugger;
    const siteSelect = getSelectElement();
    const options = getOptions();
    siteSelect.nativeElement.click();
    siteSelect.nativeElement.value = options[1].nativeElement.value;
    siteSelect.nativeElement.dispatchEvent(new Event("change"));
    
    debugger;
    await fixture.whenStable();
    debugger;

    expect(fixture.debugElement.query(By.css("input")).nativeElement.value).toBe("CrewLeader_1");
  });
});
