import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cacao';

  // constructor( private matIconRegistry: MatIconRegistry , private domSanitizer: DomSanitizer) {
  //   this.matIconRegistry.addSvgIcon('facebook-icon', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons//facebook.svg'));
  // }
}
