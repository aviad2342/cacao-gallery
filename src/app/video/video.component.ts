import { AfterViewInit } from '@angular/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Video } from './video.model';
import { VideoService } from './video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy, AfterViewInit {

  responsive = true;
  cols = 1;
  videos: Video[];
  selectedVideoId;
  private videosSubscription: Subscription;
   @ViewChild('videosTable') videosTable: DatatableComponent;
  isRowSelected = false;
  columnMode = ColumnMode;
  SelectionType = SelectionType;
  temp = [];
  selected = [];

  constructor(
    private router: Router,
    public appService: AppService,
    private videoService: VideoService
     ) {}

  ngOnInit(): void {
    this.videosSubscription = this.videoService.videos.subscribe(videos => {
      this.videos = videos;
      this.temp = [...videos];
    });
  }

  ngAfterViewInit(): void {
    this.videoService.getVideos().subscribe(videos => {
      if (this.selectedVideoId  && this.selectedVideoId !== '' && this.selectedVideoId !== null) {
        this.selected = [];
        const update = videos.find(v => v.id === this.selectedVideoId);
        this.selected.push(update);
      }
    });
  }


  filterVideos(event) {
    this.selectedVideoId = null;
    this.isRowSelected = false;
    this.selected = [];
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((v: Video) => {
      return v.title.toLowerCase().indexOf(val) !== -1 || !val;
  });
    this.videos = temp;
    }

async onAddVideo() {
  this.selectedVideoId = null;
  this.isRowSelected = false;
  this.selected = [];
  this.router.navigate(['video', 'new']);
}

async onViewVideo() {
  this.router.navigate(['video', 'view', this.selectedVideoId]);
}

async onEditVideo() {
  this.router.navigate(['video', 'edit', this.selectedVideoId]);
}

async onDeleteVideo() {
    // const alert = await this.alertController.create({
    //   cssClass: 'delete-video-alert',
    //   header: 'אישור מחיקת סירטון',
    //   message: `האם אתה בטוח שברצונך למחוק את הסירטון לצמיתות?`,
    //   mode: 'ios',
    //   buttons: [
    //     {
    //       text: 'ביטול',
    //       role: 'cancel',
    //       cssClass: 'delete-video-alert-btn-cancel',
    //       handler: () => {
    //       }
    //     }, {
    //       text: 'אישור',
    //       handler: () => {
    //         this.videoService.deleteVideo(this.selectedVideoId).subscribe( () => {
    //           this.isRowSelected = false;
    //           this.selectedVideoId = null;
    //           this.selected = [];
    //           this.appService.presentToast('הסירטון נמחקה בהצלחה!', true);
    //         }, error => {
    //           this.appService.presentToast('חלה תקלה פעולת המחיקה נכשלה!', false);
    //         });
    //       }
    //     }
    //   ]
    // });
    // await alert.present();
}

onSelect({ selected }) {
  if (this.selectedVideoId === selected[0].id) {
    this.selected = [];
    this.selectedVideoId = '';
    this.isRowSelected = false;
  } else {
    this.isRowSelected = true;
    this.selectedVideoId = selected[0].id;
  }
}

// toggleExpandRow(row) {
//   this.videosTable.rowDetail.toggleExpandRow(row);
// }

// onDetailToggle(event) {
// }

ngOnDestroy() {
  if (this.videosSubscription) {
    this.videosSubscription.unsubscribe();
  }
}

}
