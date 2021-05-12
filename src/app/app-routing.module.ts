import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { AddVideoComponent } from './video/add-video/add-video.component';
import { EditVideoComponent } from './video/edit-video/edit-video.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'video', component: VideoComponent },
  { path: 'video/new', component: AddVideoComponent },
  { path: 'video/edit/:id', component: EditVideoComponent },
  { path: 'video/view', component: VideoComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
