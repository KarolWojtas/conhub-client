import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {
  @Input('title') title: string
  constructor() { }

  ngOnInit() {
  }

}
