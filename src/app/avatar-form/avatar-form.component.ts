import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {HttpEvent, HttpEventType, HttpProgressEvent} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.css']
})
export class AvatarFormComponent implements OnInit {
   selectedFile: File
   uploadProgress = 0
    canvasScale = 200;
  form = new FormGroup({
    imageInput: new FormControl('', Validators.required),
    canvasInput: new FormControl('')
  })
  @ViewChild('canvas') canvasElementRef: ElementRef
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor(private userService: UserService, private authService: AuthService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.canvas = this.canvasElementRef.nativeElement
    this.ctx = this.canvas.getContext('2d')
  }

  handleFileChange(event){
    this.selectedFile = event.target.files[0]
    this.fillCanvas(event)
  }
  uploadAvatar(){
    this.canvas.toBlob((blob)=> {
      this.userService.fetchPostAvatar(blob, this.selectedFile.name, this.authService.principal)
        .subscribe(event => {
          switch(event.type){
            case HttpEventType.UploadProgress : this.handleProgress(event); break;
            case HttpEventType.Response : this.handleSuccess(event); break;
          }
        }, error => this.handleError())
    },"image/jpeg")

  }
  handleProgress(event){
    this.uploadProgress = Math.floor(100 * (event as HttpProgressEvent).loaded / (event as HttpProgressEvent).total);
  }
  handleSuccess(event: HttpEvent<any>){
    this.uploadProgress = 0;
    this.form.reset('',{onlySelf:false, emitEvent:false})
    this.snackBar.open('Avatar image successfully uploaded')
  }
  handleError(){
    this.uploadProgress = 0;
    this.snackBar.open('Error uploading avatar image')
  }
  fillCanvas(event){
    this.selectedFile = event.target.files[0];
    const imageFromFile = new Image();
    imageFromFile.onload = () =>{
      const canvasDim = this.calculateOptimalScale(imageFromFile.width, imageFromFile.height, this.canvasScale)
      this.ctx.clearRect(0, 0, this.canvasScale, this.canvasScale);
      this.ctx.drawImage(imageFromFile,canvasDim.startX,canvasDim.startY,canvasDim.endX,canvasDim.endY);
    }
    imageFromFile.src =URL.createObjectURL(this.selectedFile);
  }
  calculateOptimalScale(originalW,originalH,desiredScale): CanvasDirections{
    let width, height;
    if(originalW>originalH){
      width = desiredScale;
      height = Math.floor(desiredScale*originalH/originalW)
      return {
        startX: 0,
        startY: (desiredScale - height)/2,
        endX: width,
        endY: height
      }
    } else {
      width = Math.floor(desiredScale*originalW/originalH);
      height = this.canvasScale;
      return {
        startX: (desiredScale-width)/2,
        startY: 0,
        endX: width,
        endY: height
      }
    }
  }


}
export interface CanvasDirections{
  startX: number,
  startY: number,
  endX: number,
  endY: number,
}
