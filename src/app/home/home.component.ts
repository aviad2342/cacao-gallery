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
  volume = 'volume_off';
  volumeBtnTitle = 'השתק';
  cols = 1;
  audioPauseTime: number;
  audio = new Audio();
  ytiframeHtml: any;
  vimeoIframeHtml: any;
  thumbnail = 'https://dummyimage.com/600x400/000/fff&text=bla';

  constructor(
    private videoService: VideoService
     ) {


  }
  ngAfterViewInit(): void {
    this.videoService.getVideos().subscribe();
  }

  toggleVolume() {
    if (this.volume === 'volume_up') {
      this.audio.pause();
      this.volumeBtnTitle = 'נגן';
      this.volume = 'volume_off';
    } else {
      this.audio.play();
      this.volume = 'volume_up';
      this.volumeBtnTitle = 'השתק';
    }
  }

  ngOnInit(): void {
      this.audio.src = 'http://aviadbenhayun.com:3200/assets/audio/Hans_Zimmer_Time.wav';
      this.audio.volume = 0.1;
      this.videosSubscription = this.videoService.videos.subscribe(videos => {
      this.videos = videos;
    });
  }

  playVideo(url: string) {
    if (this.volume === 'volume_up') {
      this.audio.pause();
      this.volume = 'volume_off';
      this.volumeBtnTitle = 'נגן';
    }
    const lity = Lity(url);
  }

  ngOnDestroy() {
    this.audio.pause();
    if (this.videosSubscription) {
      this.videosSubscription.unsubscribe();
    }
  }

}
