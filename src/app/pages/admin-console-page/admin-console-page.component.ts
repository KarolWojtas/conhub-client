import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from "@angular-redux/store";
import {Observable, of} from "rxjs";
import {Venue, VenueService} from "../../content/services/venue.service";
import {ImageTarget} from "../../avatar-form/avatar-form.component";
import {FormControl, FormGroup} from "@angular/forms";
import {filter, flatMap, map, tap} from "rxjs/operators";
import {IMainState} from "../../redux/main-store";
import {SAVE_VENUES} from "../../redux/user-state-actions";
import {environment as env} from "../../../environments/environment";


@Component({
  selector: 'app-admin-console-page',
  templateUrl: './admin-console-page.component.html',
  styleUrls: ['./admin-console-page.component.css']
})
export class AdminConsolePageComponent implements OnInit {
  target = ImageTarget.VENUE_AVATAR
  @select(store => store.userState.venues) venues$: Observable<Venue[]>
  venuesLoaded$: Observable<Boolean>
  form =  new FormGroup({
  venueCheckbox: new FormControl()
  })
  selectedVenueInfo: Observable<Venue>
  selectedVenueAvatarUrl: string
  constructor(private venueService: VenueService, private ngRedux: NgRedux<IMainState>) {
    this.venuesLoaded$ = this.venues$.pipe(
      map(venuesArray => venuesArray.length > 0)
    )
  }
  get venueCheckbox(){
    return this.form.get('venueCheckbox')
  }

  ngOnInit() {

  }
  selectVenue(){
    this.selectedVenueInfo = this.venues$.pipe(
      flatMap((venues: Venue[]) => of(...venues)),
      filter(venue => venue.id == this.venueCheckbox.value),
      tap(venue => this.selectedVenueAvatarUrl = env.venues.avatar(venue.id))
    )
  }
  reloadVenues = () => this.venueService.fetchVenues().subscribe(
    venues => this.ngRedux.dispatch({type: SAVE_VENUES, venues: venues})
  )
}
