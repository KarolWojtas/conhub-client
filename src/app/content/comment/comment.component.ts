import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: Comment
  constructor() { }

  ngOnInit() {

  }
}
export interface Comment {
  username: string
  timestamp: Date
  text: string
}
