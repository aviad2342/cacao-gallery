import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ytiframeHtml: any;
  vimeoIframeHtml: any;

  vimeoUrl = 'https://vimeo.com/470929774';
  youtubeUrl = 'https://www.youtube.com/watch?v=iHhcHTlGtRs';

  vimeoId = '470929774';
  youtubeId = 'iHhcHTlGtRs';
  player1 = 'x20qnej';
  player2 = 'x20qnej';

  constructor( private embedService: EmbedVideoService ) {

    this.ytiframeHtml = this.embedService.embed(this.youtubeUrl);
    this.vimeoIframeHtml = this.embedService.embed(this.vimeoUrl);

    this.player1 = this.embedService.embed_youtube(this.youtubeId);
    this.player2 = this.embedService.embed_vimeo(this.vimeoId);

    console.log(this.embedService.embed(this.vimeoUrl));
    console.log(this.embedService.embed(this.youtubeUrl));

    console.log(this.embedService.embed_vimeo(this.vimeoId));
    console.log(this.embedService.embed_youtube(this.youtubeId));
  }

  ngOnInit(): void {
  }

}
