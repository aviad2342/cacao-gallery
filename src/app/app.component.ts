import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cacao';
  mediaSub: Subscription;
  deviceXs: boolean;

  constructor( public mediaObserver: MediaObserver) {}
  ngOnInit() {
    // this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
    //   this.deviceXs = res.mqAlias === 'xs' ? true : false;
    // });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
