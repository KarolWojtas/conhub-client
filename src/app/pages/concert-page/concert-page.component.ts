import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Concert, ConcertService} from "../../content/services/concert.service";
import {CommentService} from "../../content/services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {debounceTime, filter, pluck, switchMap, tap} from 'rxjs/operators'
import {environment as env} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {tassign} from "tassign";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-concert-page',
  templateUrl: './concert-page.component.html',
  styleUrls: ['./concert-page.component.css']
})
export class ConcertPageComponent implements OnInit, OnDestroy {
  @ViewChild('pageContainer') pageContainer: ElementRef
  concert: Concert
  imageUrl: string
  comments: Comment[] = []
  pageLoaded = 0
  form = new FormGroup({
    commentInput: new FormControl('')
  })
  get commentInput(){
    return this.form.get('commentInput')
  }
  scrollSubscription: Subscription
  scroll$ = fromEvent(document,'scroll', {capture: true}).pipe(
    filter(event => ( window.scrollY + window.innerHeight ) > ( this.pageContainer.nativeElement.scrollHeight -40)),
    debounceTime(2000),
    switchMap(event => {
      return this.route.params.pipe( pluck('concertId'))
    }),
    switchMap((concertId: string) => this.commentService.getAll(concertId, ++this.pageLoaded))
  )
  constructor(private concertService: ConcertService, private commentService: CommentService, private route: ActivatedRoute, private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.pipe(
      pluck('concertId'),
      switchMap((concertId: string) => this.concertService.getConcertInfo(concertId)),
      tap(concert => this.setUpConcert(concert)),
      switchMap((concert: Concert) => this.commentService.getAll(concert.id, this.pageLoaded))
    ).subscribe(comments => this.comments = comments, error => console.log(error))
    this.scrollSubscription = this.scroll$.subscribe((comments: Comment[]) => {this.comments = [...this.comments,...comments]})
    this.commentService.commentsSse().subscribe()
  }
  setUpConcert = (concert: Concert) => {
    this.concert = concert
    this.imageUrl = env.base_url+env.venues.base_url+`/${concert.venue.id}/avatar`
  }
  onClickSend(){
    if(this.commentInput.value == '') {
      this.snackBar.open("Comment can't be empty")
      return
    }
    this.sendComment(this.concert.id, this.commentInput.value, this.authService.principal)
  }
  sendComment(concertId: string, text: string, username: string){
    if(this.authService.principal != null){
      this.form.reset('', {emitEvent:false, onlySelf: true})
      this.commentService.postComment(concertId, username, text).subscribe(comment => { this.comments = [comment, ...this.comments]})
    }

  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe()
  }

}
