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
  isValidUrl = true;

  constructor(
    private embedService: EmbedVideoService,
    private location: Location,
    public appService: AppService,
    private router: Router,
    private videoService: VideoService
     ) {}

  ngOnInit(): void {
    this.activeUrl = this.router.url;
  }

  onUrlChange(event) {
    if (event.target.value && this.thumbnail !==  event.target.value) {
     this.videoId = this.getVideoID(event.target.value);
    }
  }

  getVideoID(videoURL: string) {

    this.embedService.embed_image(videoURL, { image: 'maxresdefault' }).then(res => {
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
