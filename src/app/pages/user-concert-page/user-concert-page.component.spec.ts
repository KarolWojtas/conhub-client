import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConcertPageComponent } from './user-concert-page.component';

describe('UserConcertPageComponent', () => {
  let component: UserConcertPageComponent;
  let fixture: ComponentFixture<UserConcertPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConcertPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConcertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
