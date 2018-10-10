import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertSearchPageComponent } from './concert-search-page.component';

describe('ConcertSearchPageComponent', () => {
  let component: ConcertSearchPageComponent;
  let fixture: ComponentFixture<ConcertSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
