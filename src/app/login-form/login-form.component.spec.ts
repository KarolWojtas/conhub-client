import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import {AuthService} from "../services/auth.service";
import {MockAuthService, tokenMock} from "../services/mocks/mock.auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatProgressSpinnerModule,
  MatToolbarModule
} from "@angular/material";
import {TrimQuotesPipe} from "../pipes/trim-quotes.pipe";
import {AvatarFormComponent} from "../avatar-form/avatar-form.component";
import {FormTemplateComponent} from "../form-template/form-template.component";
import {NgRedux, NgReduxModule} from "@angular-redux/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Observable, throwError} from "rxjs";

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let http: HttpClient

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent, TrimQuotesPipe, AvatarFormComponent, FormTemplateComponent  ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ],
      imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatCardModule,
        HttpClientModule,
        NgReduxModule, MatInputModule, BrowserAnimationsModule

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    http = TestBed.get(HttpClient)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle success', () => {
    spyOn(component, "usernameValue"  ).and.returnValue('username')
    spyOn(component, "passwordValue").and.returnValue('password')

    const handleErrorSpy = spyOn(component, "handleLoginSuccessful")

    component.login()
    fixture.detectChanges()

    expect(handleErrorSpy).toHaveBeenCalled()
  })
  it('should handle error', inject([AuthService], (authService: AuthService)=> {
    spyOn(authService, 'fetchToken').and.returnValue(throwError('Error auth'))
    spyOn(component, "usernameValue"  ).and.returnValue('username')
    spyOn(component, "passwordValue").and.returnValue('password')
    const handleSuccessSpy = spyOn(component, 'handleLoginUnsuccessful')

    component.login()

    expect(handleSuccessSpy).toHaveBeenCalled()
  }))
});
