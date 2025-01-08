import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AppRefactorComponent } from './app.refactor.component';

describe('AppRefactorComponent', () => {
  let component: AppRefactorComponent;
  let fixture: ComponentFixture<AppRefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppRefactorComponent, FormsModule, ReactiveFormsModule, ],
      providers:[ provideHttpClient(), provideHttpClientTesting() ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppRefactorComponent);
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
