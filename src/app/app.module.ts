import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {isDevMode, NgModule} from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { AppComponent } from './app.component';
import { MaterialModule } from "src/app/material/material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IMainState, rootReducer, MAIN_STATE } from "src/app/redux/main-store";
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from "src/app/services/auth.service";
import { ErrorHandler } from "@angular/core";
import { AppErrorHandler } from "src/app/errors/AppErrorHandler";
import { ReactiveFormsModule } from "@angular/forms";
import { TokenHttpInterceptor } from "src/app/interceptors/TokenHttpInterceptor";
import { UserService } from "src/app/services/user.service";
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { DevToolsExtension} from "@angular-redux/store";
import { TrimQuotesPipe } from './pipes/trim-quotes.pipe';
import { AvatarFormComponent } from './avatar-form/avatar-form.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material";
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TrimQuotesPipe,
    AvatarFormComponent,
    FormTemplateComponent,
    PasswordChangeComponent,
    SignInDialogComponent
  ],
  entryComponents:[
    SignInDialogComponent,
    LoginFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    NgReduxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,
              UserService,
              {provide: ErrorHandler, useClass: AppErrorHandler},
              {provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true},
              {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}

              ],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor(ngRedux: NgRedux<IMainState>, devTools: DevToolsExtension){
        let enhancers =  [devTools.enhancer()]
        ngRedux.configureStore(rootReducer, MAIN_STATE,[], enhancers);
    }
}
