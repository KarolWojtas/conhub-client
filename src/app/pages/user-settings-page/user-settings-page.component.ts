import { Component, OnInit } from '@angular/core';
import {ImageTarget} from "../../avatar-form/avatar-form.component";

@Component({
  selector: 'app-user-settings-page',
  templateUrl: './user-settings-page.component.html',
  styleUrls: ['./user-settings-page.component.css']
})
export class UserSettingsPageComponent implements OnInit {
  target = ImageTarget.USER_AVATAR
  constructor() { }

  ngOnInit() {
  }


}
