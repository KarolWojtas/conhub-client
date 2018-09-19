import { NgModule } from '@angular/core';
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
  MatChipsModule, MatSelectModule, MatSlideToggleModule, MatDatepickerModule, MatTableModule
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
    MatTableModule
    ]
})
export class MaterialModule { }
