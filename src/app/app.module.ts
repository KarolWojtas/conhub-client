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
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatNativeDateModule} from "@angular/material";
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { ConcertSearchComponent } from './content/concert-search/concert-search.component';
import {ConcertService} from "./content/services/concert.service";
import {VenueService} from "./content/services/venue.service";
import {RouterModule} from "@angular/router";
import { UserConcertPageComponent } from './pages/user-concert-page/user-concert-page.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { ConcertSearchPageComponent } from './pages/concert-search-page/concert-search-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CommentComponent } from './content/comment/comment.component';
import { ConcertPageComponent } from './pages/concert-page/concert-page.component';
import { PageContainerDirective } from './directives/page-container.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AvatarImageComponent } from './avatar-image/avatar-image.component';
import { AdminConsolePageComponent } from './pages/admin-console-page/admin-console-page.component';
import {InterestService} from "./content/services/interest.service";
import {UserPageAuthGuard} from "./pages/auth-guards/user-page-auth-guard";
import {AdminPageAuthGuard} from "./pages/auth-guards/admin-page-auth-guard";
import { VenueAvatarDirective } from './directives/venue-avatar.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TrimQuotesPipe,
    AvatarFormComponent,
    FormTemplateComponent,
    PasswordChangeComponent,
    SignInDialogComponent,
    ConcertSearchComponent,
    UserConcertPageComponent,
    UserSettingsPageComponent,
    ConcertSearchPageComponent,
    MainPageComponent,
    CommentComponent,
    ConcertPageComponent,
    PageContainerDirective,
    AvatarImageComponent,
    AdminConsolePageComponent,
    VenueAvatarDirective
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
    BrowserAnimationsModule,
    MatNativeDateModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {path: "user/:username/concerts", component: UserConcertPageComponent, canActivate: [UserPageAuthGuard]},
      {path: "user/:username/settings", component: UserSettingsPageComponent, canActivate: [UserPageAuthGuard]},
      {path: "search", component: ConcertSearchPageComponent},
      {path: 'concert/:concertId', component: ConcertPageComponent},
      {path: 'admin', component: AdminConsolePageComponent, canActivate: [AdminPageAuthGuard]},
      {path: "**", component: MainPageComponent}
    ])
  ],
  providers: [AuthService,
    UserService,
    UserPageAuthGuard,
    AdminPageAuthGuard,
    InterestService,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
    ConcertService,
    VenueService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor(ngRedux: NgRedux<IMainState>, devTools: DevToolsExtension){
        let enhancers =  [devTools.enhancer()]
        ngRedux.configureStore(rootReducer, MAIN_STATE,[], enhancers);
    }
}
