import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {fromEvent, Observable, onErrorResumeNext} from "rxjs";
import {DateFormatter} from "../concert-search/concert-search.component";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  eventSource = new EventSource(env.concerts.comment.sse())
  constructor(private http: HttpClient) {
  }

  getAll = (concertId: string, page: number) => {
    let params = new HttpParams()
    params = params.append("page", page.toString())
    params = params.append("by", "timestamp")
    params = params.append("direction", "desc")
    return this.http.get<Comment[]>(env.concerts.comment.getAll(concertId), {params: params})
  }

  postComment = (concertId: string, username: string, text: string) => this.http.post<Comment>(env.concerts.comment.post(concertId, username),this.commentDto(text, DateFormatter.trimZFromDate(new Date(Date.now()))))

  deleteComment = (commentId: string, username: string) => this.http.delete(env.concerts.comment.delete(commentId, username))

  commentDto = (text: string, timestamp: string): ConcertCommentDto => Object.assign({}, {text: text, timestamp: timestamp})

  commentsSse = () => fromEvent(this.eventSource, 'onmessage').pipe(
    tap(response => console.log(response))
  )
}
export interface ConcertCommentDto{
  text: string
  timestamp: string
}
