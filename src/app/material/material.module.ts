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
  MatIconModule, MatProgressSpinnerModule, MatGridListModule, MatListModule
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
        MatListModule
    ]
})
export class MaterialModule { }
