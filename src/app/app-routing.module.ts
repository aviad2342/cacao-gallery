import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { AddVideoComponent } from './video/add-video/add-video.component';
import { EditVideoComponent } from './video/edit-video/edit-video.component';
import { AboutComponent } from './about/about.component';
import { ViewVideoComponent } from './video/view-video/view-video.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'video', component: VideoComponent, canActivate: [AuthGuard] },
  { path: 'video/new', component: AddVideoComponent },
  { path: 'video/edit/:id', component: EditVideoComponent },
  { path: 'video/view/:id', component: ViewVideoComponent }
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
