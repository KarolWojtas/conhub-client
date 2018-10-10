import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {blobToFile} from "../../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: HttpClient) { }

  fetchVenues(){
    return this.http.get<Venue>(env.base_url+env.venues.base_url)
  }
  fetchPostAvatar = (venueId: string, imageName: string, blobImage: Blob) => {
    const fd = new FormData();
    fd.append('image', blobToFile(blobImage, imageName) );
    return this.http.post(env.venues.avatar(venueId), fd, {reportProgress: true, observe: "events"})}
}
export interface Venue{
  id: string
  name: string
}
