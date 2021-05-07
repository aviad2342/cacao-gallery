import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  videos: Video[];
  private videosSubscription: Subscription;
  responsive = true;
  volume = 'volume_up';
  cols = 1;
  audio = new Audio();
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
    // console.log(this.embedService.embed_image('https://vimeo.com/470929774'));
    // Lity('https://vimeo.com/470929774');
    this.player1 = this.embedService.embed_youtube(this.youtubeId);
    this.player2 = this.embedService.embed_vimeo(this.vimeoId);

    // console.log(this.embedService.embed(this.vimeoUrl).changingThisBreaksApplicationSecurity);
    // console.log(this.embedService.embed(this.youtubeUrl));

    // console.log(this.embedService.embed_vimeo(this.vimeoId));
    // console.log(this.embedService.embed_youtube(this.youtubeId));

  }
  ngAfterViewInit(): void {
    this.videoService.getVideos().subscribe();
  }

  toggleVolume() {
    if (this.volume === 'volume_up') {
      this.audio.pause();
      this.volume = 'volume_off';
    } else {
      this.audio.play();
      this.volume = 'volume_up';
    }
  }

  ngOnInit(): void {
      this.audio.src = '../../assets/audio/Hans_Zimmer_Time.wav';
      this.audio.volume = 0.1;
      this.audio.load();
      this.audio.play();
      this.videosSubscription = this.videoService.videos.subscribe(videos => {
      this.videos = videos;
    });
  }

  playVideo(url: string) {
    if (this.volume === 'volume_up') {
      this.audio.pause();
      this.volume = 'volume_off';
    }
    const lity = Lity(url);
  }

  ngOnDestroy() {
    if (this.videosSubscription) {
      this.videosSubscription.unsubscribe();
    }
  }

}
