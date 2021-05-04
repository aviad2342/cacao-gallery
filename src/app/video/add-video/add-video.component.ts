import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgForm } from '@angular/forms';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { Location } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {

  videoId = '';
  embed = '';
  thumbnail = 'https://www.geirangerfjord.no/upload/images/2018_general/film-and-vid.jpg';
  activeUrl = '';

  constructor(
    private embedService: EmbedVideoService,
    private location: Location,
    public appService: AppService,
    private router: Router,
    private videoService: VideoService
     ) {}

  ngOnInit(): void {
    this.activeUrl = this.router.url;
    this.appService.presentToast('הסרטון נשמר בהצלחה', true);
  }

  onUrlChange(event) {
    if (event.detail.value && this.thumbnail !==  event.detail.value) {
     this.videoId = this.getVideoID(event.detail.value);
    }
  }

  getVideoID(videoURL: string){
    if (videoURL.includes('v=')) {
      this.thumbnail = `https://img.youtube.com/vi/${videoURL.split('v=')[1].split('&')[0]}/sddefault.jpg`;
      return videoURL.split('v=')[1].split('&')[0];
    } else if (videoURL.includes('/embed/')) {
      this.thumbnail = `https://img.youtube.com/vi/${videoURL.split('/embed/')[videoURL.split('/embed/').length - 1]}/sddefault.jpg`;
      return videoURL.split('/embed/')[videoURL.split('/embed/').length - 1];
    } else if (videoURL.includes('vimeo')) {
      // this.videoService...(videoURL.replace('https://vimeo.com/', '')).subscribe(thumbnail => {
      //   this.thumbnail = thumbnail;
      // });
      return videoURL.replace('https://vimeo.com/', '');
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
