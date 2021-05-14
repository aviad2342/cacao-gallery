import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { AppService } from 'src/app/app.service';
import { Video } from '../video.model';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

  video: Video;
  activeUrl = '';
  @ViewChild('f', { static: true }) form: NgForm;
  videoId = '';
  embed = '';
  formFieldClass = 'bb';
  thumbnail = 'http://aviadbenhayun.com:3000/images/1620749294644@film-background-image.jpg.jpg';
  isValidUrl = true;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private videoService: VideoService,
    private embedService: EmbedVideoService,
    private breakpointObserver: BreakpointObserver,
    private appService: AppService
    ) { }

  ngOnInit(): void {

    this.activeUrl = this.router.url;
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.location.back();
        return;
      }
      this.videoService.getVideo(paramMap.get('id')).subscribe(video => {
            this.video = video;
            const videoObj = {
              title:       video?.title,
              description: video?.description,
              videoURL:    video?.videoURL,
              category:    video?.category
              };
            this.thumbnail = video.thumbnail;
            this.form.setValue(videoObj);
          },
          error => {
            if (this.router.isActive(this.activeUrl, false)) {
              this.appService.presentToast('ישנה תקלה! לא ניתן להציג את הסרטון.', false);
              this.location.back();
            }
          }
        );
    });

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
    const videoToUpdate = new Video(
      this.video.id,
      this.video.videoId,
      form.value.videoURL,
      this.video.embed,
      form.value.title,
      form.value.description,
      form.value.category,
      this.video.date,
      this.video.thumbnail
    );
    this.videoService.updateVideo(videoToUpdate).subscribe(video => {
      form.reset();
      this.appService.presentToast('הסרטון עודכן בהצלחה', true);
      this.location.back();
    }, error => {
      form.reset();
      this.appService.presentToast('חלה תקלה הסרטון לא עודכן!', false);
      if (this.router.isActive(this.activeUrl, false)) {
        this.location.back();
      }
    });
  }

  onCancel() {
    this.appService.presentToast('הפעולה בוטלה', true);
    this.location.back();
  }

}
