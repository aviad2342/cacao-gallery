import { Component, OnInit, ViewChild } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgForm } from '@angular/forms';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { Location } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {

  @ViewChild('f', { static: true }) form: NgForm;
  videoId = '';
  embed = '';
  formFieldClass = 'bb';
  deviceXs: boolean;
  deviceMd: boolean;
  // thumbnail = 'https://image.freepik.com/free-vector/open-clapper-board-with-film-strip-background-design_1017-26102.jpg';
  thumbnail = '../../../assets/images/film-background-image.jpg';
  activeUrl = '';
  isValidUrl = true;

  constructor(
    private embedService: EmbedVideoService,
    private location: Location,
    public appService: AppService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private videoService: VideoService
     ) {}

  ngOnInit(): void {
    this.activeUrl = this.router.url;
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe( (state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
        this.formFieldClass = 'mat-form-input-field-xsmall';
      }
      if (state.breakpoints[Breakpoints.Small]) {
        this.formFieldClass = 'mat-form-input-field-small';
      }
      if (state.breakpoints[Breakpoints.Medium]) {
        this.formFieldClass = 'mat-form-input-field-medium';
      }
      if (state.breakpoints[Breakpoints.Large]) {
        this.formFieldClass = 'mat-form-input-field-large';
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        this.formFieldClass = 'mat-form-input-field';
      }
    });
  }

  onUrlChange(event) {
    // console.log(this.form.control.get('videoURL').status);
    // console.log(event.target.validity);
    // console.log(event.target.validity.valid);
    if (event.target.value && this.thumbnail !==  event.target.value) {
     this.videoId = this.getVideoID(event.target.value);
    }
  }

  getVideoID(videoURL: string) {

    this.embedService.embed_image(videoURL, { image: 'hqdefault' }).then(res => {
      this.thumbnail = res.link;
      });

    this.embed = this.embedService.embed(videoURL).changingThisBreaksApplicationSecurity;

    if (videoURL.includes('www.youtube.com/watch?v=')) {
      this.isValidUrl = true;
      return videoURL.split('v=')[1].split('&')[0];
    } else if (videoURL.includes('/embed/')) {
      this.isValidUrl = true;
      return videoURL.split('/embed/')[videoURL.split('/embed/').length - 1];
    } else if (videoURL.includes('vimeo')) {
      this.isValidUrl = true;
      return videoURL.replace('https://vimeo.com/', '');
    } else {
      this.isValidUrl = false;
    }
  }

  getVideoThumbnail(videoId: string){
    return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const videoToAdd = new Video(
      null,
      this.videoId,
      form.value.videoURL,
      this.embed,
      form.value.title,
      form.value.description,
      form.value.category,
      new Date(),
      this.thumbnail,
    );
    this.videoService.addVideo(videoToAdd).subscribe(video => {
      form.reset();
      this.appService.presentToast('הסרטון נשמר בהצלחה', true);
      this.location.back();
    }, error => {
      form.reset();
      this.appService.presentToast('חלה תקלה הסרטון לא נשמר!', false);
      if (this.router.isActive(this.activeUrl, false)) {
        this.location.back();
      }
    });
  }

}
