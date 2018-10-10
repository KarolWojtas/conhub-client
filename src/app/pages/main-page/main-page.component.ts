import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from "@angular-redux/store";
import {Observable} from "rxjs";
import {Venue, VenueService} from "../../content/services/venue.service";
import {SAVE_VENUES} from "../../redux/user-state-actions";
import {IMainState} from "../../redux/main-store";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @select(store => store.userState.venues) venues
  constructor() {

  }

  ngOnInit() {

  }

}
