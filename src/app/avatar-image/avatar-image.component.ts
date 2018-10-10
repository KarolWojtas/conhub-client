import {Component, Input, OnInit} from '@angular/core';
import {environment as env} from "../../environments/environment";

@Component({
  selector: 'avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.css']
})
export class AvatarImageComponent implements OnInit {
  @Input('username') username: string
  avatarUrl
  constructor() { }

  ngOnInit() {
    this.avatarUrl = env.base_url+env.user_base_url+this.username+'/avatar'
  }
  onError(){
    this.avatarUrl = 'src/assets/baseline-perm_identity-24px.svg'
  }

}
