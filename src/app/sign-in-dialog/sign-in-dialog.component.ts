import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.css']
})
export class SignInDialogComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<SignInDialogComponent>) { }

  ngOnInit() {
  }
  handleSuccess(event: boolean){
    this.dialogRef.close()
  }
}
