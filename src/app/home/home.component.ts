import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import Lity from 'lity';
import { VideoService } from '../video/video.service';
import { Video } from '../video/video.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  videos: Video[];
  private videosSubscription: Subscription;
  responsive = true;
  cols = 1;
  ytiframeHtml: any;
  vimeoIframeHtml: any;
  thumbnail = 'https://dummyimage.com/600x400/000/fff&text=bla';

  vimeoUrl = 'https://vimeo.com/470929774';
  youtubeUrl = 'https://www.youtube.com/watch?v=iHhcHTlGtRs';

  vimeoId = '470929774';
  youtubeId = 'iHhcHTlGtRs';
  player1 = 'x20qnej';
  player2 = 'x20qnej';

  constructor(
    private embedService: EmbedVideoService,
    private videoService: VideoService
     ) {

    this.ytiframeHtml = this.embedService.embed(this.youtubeUrl);
    this.vimeoIframeHtml = this.embedService.embed(this.vimeoUrl);
    this.embedService.embed_image('https://www.youtube.com/watch?v=iHhcHTlGtRs', { image: 'thumbnail_medium' }).then(res => {
    this.thumbnail = res.link;
    });
    console.log(this.embedService.embed_image('https://www.youtube.com/watch?v=iHhcHTlGtRs'));

    this.embedService.embed_image('https://www.youtube.com/watch?v=iHhcHTlGtRs', { image: 'thumbnail_medium' }).then(res => {
    this.thumbnail = res.link;
    });
    console.log(this.embedService.embed_image('https://vimeo.com/470929774'));
    // Lity('https://vimeo.com/470929774');
    this.player1 = this.embedService.embed_youtube(this.youtubeId);
    this.player2 = this.embedService.embed_vimeo(this.vimeoId);

    // console.log(this.embedService.embed(this.vimeoUrl));
    // console.log(this.embedService.embed(this.youtubeUrl));

    // console.log(this.embedService.embed_vimeo(this.vimeoId));
    // console.log(this.embedService.embed_youtube(this.youtubeId));


  }

  ngOnInit(): void {
    this.videosSubscription = this.videoService.getAllVideos().subscribe((videos) => {
      this.videos = videos;
    });
  }

  playVideo(url: string) {
    Lity(url);
  }

  ngOnDestroy() {
    if (this.videosSubscription) {
      this.videosSubscription.unsubscribe();
    }
  }

}
