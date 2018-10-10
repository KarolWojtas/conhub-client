import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from "@angular-redux/store";
import {defaultIfEmpty, filter, flatMap, map, switchMap, tap} from "rxjs/operators";
import {EMPTY_USER, User} from "../../redux/user-store";
import {Concert} from "../../content/services/concert.service";
import {Observable, of} from "rxjs";
import {InterestService} from "../../content/services/interest.service";
import {environment} from "../../../environments/environment";
import {ADD_CONCERT_INTEREST, REMOVE_CONCERT_INTEREST} from "../../redux/user-state-actions";
import {IMainState} from "../../redux/main-store";

@Component({
  selector: 'app-user-concert-page',
  templateUrl: './user-concert-page.component.html',
  styleUrls: ['./user-concert-page.component.css']
})
export class UserConcertPageComponent implements OnInit {
  concerts:Concert[] =[]
  @select(store => store.userState.loggedInUser) user: Observable<User>
  columnsToDisplay = ['name', 'venue', 'date', 'link', 'interest']
  env = environment
  principal
  pdfUrl
  constructor(private interestService: InterestService, private ngRedux: NgRedux<IMainState>) {
    this.user.pipe(
      map(user => user.username),
      tap(username => this.principal = username),
      switchMap(username => this.interestService.fetchInterestConcertsObjects(username, true))
    ).subscribe((concerts: Concert[]) => {this.concerts = concerts;
      this.pdfUrl = this.env.interests.base_url(this.principal)+'?file=pdf'
    })
  }

  ngOnInit() {
  }
  removeInterest = (concert: Concert) => {
    if(this.principal){
      this.interestService.fetchDeleteInterest(this.principal, {concertId: concert.id}).subscribe(response => {
        this.ngRedux.dispatch({type: REMOVE_CONCERT_INTEREST, concertId: concert.id})
        this.concerts = this.concerts.filter(con => con.id != concert.id)
      })
    }

  }

}
