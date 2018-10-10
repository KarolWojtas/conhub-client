import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {Concert} from "./concert.service";
import {flatMap, pluck, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(private http: HttpClient) { }

  fetchInterestConcerts = (username: string, indices: boolean) => this.http.get<Concert[]>(env.interests.base_url(username), {params: {indices: `false`}}).pipe(
      flatMap(array => of(...array)),
      pluck('id')
    )
  fetchInterestConcertsObjects = (username: string, indices: boolean) => this.http.get<Concert[]>(env.interests.base_url(username), {params: {indices: `false`}})


  fetchPostInterest = (username: string, interestDto:ConcertInterestDto) => this.http.post(env.interests.base_url(username), interestDto)

  fetchDeleteInterest = (username: string, interestDto: ConcertInterestDto ) => {
    const req = new HttpRequest("DELETE", env.interests.base_url(username)).clone({body: interestDto})
    return this.http.request(req)
  }}

export interface ConcertInterest{
  id: string
  concertId: string
  username: string
}
export interface ConcertInterestDto{
  concertId: string
}
