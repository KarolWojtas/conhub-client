import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsolePageComponent } from './admin-console-page.component';

describe('AdminConsolePageComponent', () => {
  let component: AdminConsolePageComponent;
  let fixture: ComponentFixture<AdminConsolePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsolePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsolePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
