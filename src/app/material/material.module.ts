import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatStepperModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatListModule,
  MatSnackBarModule,
  MatDialogModule,
  MatChipsModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatTableModule,
  MatExpansionModule,
  MatMenuModule, MatTreeModule, MatRadioModule, MatTooltipModule
} from '@angular/material';


@NgModule({
  exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatStepperModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatListModule,
        MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatTableModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule,
    MatTooltipModule
    ]
})
export class MaterialModule { }
