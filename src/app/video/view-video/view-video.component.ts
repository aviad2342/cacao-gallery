import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
import Lity from 'lity';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {

  video: Video;
  activeUrl = '';
  isValidUrl = true;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private videoService: VideoService,
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
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            if (this.router.isActive(this.activeUrl, false)) {
              this.appService.presentToast('ישנה תקלה! לא ניתן להציג את הסרטון.', false);
              this.location.back();
            }
          }
        );
    });

    this.activeUrl = this.router.url;
  }

  onPlayVideo() {
    Lity(this.video.videoURL);
  }

  onGoBack() {
    // this.router.navigate(['video']);
    this.location.back();
  }

}
