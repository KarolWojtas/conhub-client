import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Concert, ConcertSearchParams, ConcertService} from "../services/concert.service";
import {Venue, VenueService} from "../services/venue.service";
import {
  ADD_CONCERT_INTEREST,
  REMOVE_CONCERT_INTEREST,
  SAVE_VENUES
} from "../../redux/user-state-actions";
import {NgRedux, select} from "@angular-redux/store";
import {IMainState} from "../../redux/main-store";
import {FormControl, FormGroup} from "@angular/forms";
import {fromEvent, Observable, of, Subscription} from "rxjs";
import {environment as env} from "../../../environments/environment";
import {InterestService} from "../services/interest.service";
import {AuthService} from "../../services/auth.service";
import {debounceTime, defaultIfEmpty, filter, flatMap, map, share, switchMap, tap, throttleTime} from "rxjs/operators";
import {EMPTY_USER, User} from "../../redux/user-store";
import {tassign} from "tassign";

@Component({
  selector: 'concert-search',
  templateUrl: './concert-search.component.html',
  styleUrls: ['./concert-search.component.css']
})
export class ConcertSearchComponent implements OnInit, OnDestroy {
  @ViewChild('concertTable') table: ElementRef
  @ViewChild('pageContainer') pageContainer: ElementRef
  searchParams: ConcertSearchParams = {
    after: undefined,
    before: undefined,
    venues: undefined,
    direction: undefined,
    by: undefined,
    size: undefined,
    page: undefined,
    name: undefined
  }
  env = env
  principal = this.authService.principal
  @select(store => store.userState.concertInterestIds) concertInterestIds
  @select(store => store.userState.loggedInUser) user
  concerts: Concert[] =[]
  columnsToDisplay = ['name', 'venue', 'date', 'link']
  DAY = 24*60*60*1000
  form = new FormGroup({
    name: new FormControl(''),
    venues: new FormControl(''),
    direction: new FormControl(''),
    by: new FormControl(''),
    before: new FormControl(''),
    after: new FormControl(new Date(Date.now()))
  })
  scroll$ = fromEvent(document,'scroll', {capture: true}).pipe(
    filter(event => ( window.scrollY + window.innerHeight ) > ( this.pageContainer.nativeElement.scrollHeight -40)),
    debounceTime(2000),
    tap(shouldLoad => console.log('shouldLoad')),
    switchMap(event => {
      this.searchParams = tassign(this.searchParams, {page: this.searchParams.page+1})
      return this.concertService.fetchSearchConcerts(this.searchParams)
    })
  )
  scrollSubscription: Subscription
  @select(state => state.userState.venues) venuesList: Observable<Venue[]>
  constructor(private concertService: ConcertService , private venueService: VenueService, private ngRedux: NgRedux<IMainState>,
              private interestService: InterestService, private authService: AuthService) {
  }

  ngOnInit() {
    this.venueService.fetchVenues().subscribe( venues => this.ngRedux.dispatch({type: SAVE_VENUES, venues: venues}))
    this.user.pipe(
      filter(user => user != EMPTY_USER),
      switchMap(user => this.interestService.fetchInterestConcerts(this.principal, true))
    )
      .subscribe(concertId => {
        this.ngRedux.dispatch({type: ADD_CONCERT_INTEREST, concertId: concertId})})

    this.user.pipe(map(user => user != EMPTY_USER)).subscribe(loggedIn => loggedIn ? this.columnsToDisplay = [...this.columnsToDisplay, 'interest'] : this.columnsToDisplay)
    this.scrollSubscription = this.scroll$.subscribe(concerts => this.concerts = [...this.concerts, ...concerts])
  }

  get name(){
    return this.form.get('name')
  }
  get venues(){
    return this.form.get('venues')
  }
  get direction(){
    return this.form.get('direction')
  }
  get by(){
    return this.form.get('by')
  }
  get before(){
    return this.form.get('before')
  }
  get after(){
    return this.form.get('after')
  }
  removeVenueChip(event){
    const newVenues = (this.venues.value as string[]).filter(venue => venue != event)
    this.venues.setValue(newVenues)
  }
  beforeFilter = (d: Date): boolean => {
   return  this.after.value ? d.getDate() > this.after.value.getDate() : d >= new Date(Date.now())
  }
  afterFilter = (d: Date): boolean => {
    return this.before.value ? d.getDate() < this.before.value.getDate() && d >= new Date(Date.now()-this.DAY) : d >= new Date(Date.now()-this.DAY)
  }
  search(){
    this.searchParams = {
      venues: this.venues.value ? this.venues.value : undefined,
      before: this.before.value  ? DateFormatter.trimZFromDate(this.before.value) : undefined,
      after: this.after.value ? DateFormatter.trimZFromDate(this.after.value) : undefined,
      direction: this.direction ? this.direction.value ? "asc" : "desc" : undefined,
      size: 20,
      page: 0,
      by: this.by.value ? this.by.value : undefined,
      name: this.name.value  ? this.name.value : undefined
    }
    this.concertService.fetchSearchConcerts(this.searchParams).subscribe(concerts => {
      this.concerts = concerts
    })
  }
  addInterest = (concert: Concert) => {
    if(this.principal){
      this.interestService.fetchPostInterest(this.principal, {concertId: concert.id})
        .subscribe(response => this.ngRedux.dispatch({type: ADD_CONCERT_INTEREST, concertId: concert.id}))
    }
  }
  removeInterest = (concert: Concert) => {
    if(this.principal){
      this.interestService.fetchDeleteInterest(this.principal, {concertId: concert.id}).subscribe(response => {
        this.ngRedux.dispatch({type: REMOVE_CONCERT_INTEREST, concertId: concert.id})
      })
    }

  }
  isConcertInInterest = (concert: Concert) => this.concertInterestIds.pipe(
    flatMap((ids: Concert[]) => of(...ids)),
    map(id => id == concert.id),
    filter(id => id == true),
    defaultIfEmpty(() => false)
  )
  loadMoreConcerts(){

  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe()
    this.concerts = []
  }

}
export class DateFormatter{
  static trimZFromDate(date: Date): string{
    return date.toISOString().substr(0, date.toISOString().length-1)
  }
}


