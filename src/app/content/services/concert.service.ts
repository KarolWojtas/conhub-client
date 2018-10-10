import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  constructor(private http: HttpClient) { }

  fetchSearchConcerts(searchParams: ConcertSearchParams){
    let params = new HttpParams()
    params = searchParams.size != undefined ? params.append('size', searchParams.size.toString()) : params
    params = searchParams.page != undefined ? params.append('page', searchParams.page.toString()) : params
    params = searchParams.direction != undefined ? params.append('direction', searchParams.direction) : params
    params = searchParams.by != undefined ? params.append('by', searchParams.by) : params
    params = searchParams.before != undefined ? params.append('before', searchParams.before) : params
    params = searchParams.after != undefined ? params.append('after', searchParams.after) : params
    params = searchParams.name != undefined ? params.append('name', searchParams.name) : params
    if(searchParams.venues != undefined){
      searchParams.venues.forEach(venue => params =  params.append('venue', venue))
    }

    return this.http.get<Concert[]>(env.base_url+env.concerts.base_url, {params: params})
  }
  getConcertInfo = (concertId: string) => this.http.get<Concert>(env.base_url+env.concerts.base_url+'/'+concertId)

}
export interface ConcertSearchParams{
  page: number
  size: number
  by: string
  direction: string
  name: string
  before: string
  after: string
  venues: string[]
}
export interface Concert{
  id: string
  name: string
  venue: NestedVenue
  date: Date

}
export interface NestedVenue{
  id: string
  name: string
}

