import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Video } from './video.model';

export interface VideoResponseData {
  video_id: string;
  thumbnail_url: string;
}

const LOCALHOST = environment.LOCALHOST;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  // tslint:disable-next-line: variable-name
  private _videos = new BehaviorSubject<Video[]>([
    new Video('1', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('2', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('3', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('4', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('5', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('6', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('7', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('8', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff'),
    new Video('9', 'iAmBwus7X40', 'https://www.youtube.com/watch?v=iAmBwus7X40', '<iframe width="1904" height="768" src="https://www.youtube.com/embed/iAmBwus7X40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'סרטון לבדיקה', 'סתם חרא סרטון', 'noob', new Date(), 'https://dummyimage.com/500x300/000/fff')
  ]);

  get videos() {
    return this._videos.asObservable();
  }

  constructor( private http: HttpClient ) { }

  getAllVideos() {
    return this.videos.pipe(
      map (videos => {
        return videos;
      })
    );
  }

  getVideos() {
    return this.http.get<Video[]>(`http://${LOCALHOST}:3000/api/video/videos`)
    .pipe(tap(resDta => {
      this._videos.next(resDta);
    }));
  }

  getVideo(id: string) {
    return this.http.get<Video>(`http://${LOCALHOST}:3000/api/video/video/${id}`)
    .pipe(tap(resDta => {
      return resDta;
    }));
  }

  addVideo(video: Video) {
    return this.http.post<Video>(`http://${LOCALHOST}:3000/api/video/video`,
    {
      ...video
    }).
    pipe(
      switchMap(resData => {
        video.id = resData.id;
        return this.videos;
      }),
      take(1),
      tap(videos => {
        this._videos.next(videos.concat(video));
      }));
  }


  updateVideo(video: Video) {
    const videoObj = {
      videoId:     video.videoId,
      videoURL:    video.videoURL,
      embed:       video.embed,
      title:       video.title,
      description: video.description,
      category:    video.category,
      date:        video.date,
      thumbnail:   video.thumbnail
      };
    return this.http.put<Video>(`http://${LOCALHOST}:3000/api/video/video/${video.id}`,
    {
      ...videoObj
    }).
    pipe(
      switchMap(resData => {
        return this.getVideos();
      }),
      switchMap(videos => {
        // this._videos.next(updates);
        return videos.filter(u => u.id === video.id);
      }),
      take(1),
      tap(videoData => {
        return videoData;
      }));
  }

  deleteVideo(id: string) {
    return this.http.delete(`http://${LOCALHOST}:3000/api/video/video/${id}`).
    pipe(
      switchMap(resData => {
        return this.getVideos();
      }),
      tap(videos => {
        this._videos.next(videos.filter(v => v.id !== id));
      }));
  }

  getVimeoVideo(videoId: string) {
    return this.http.get(`https://vimeo.com/api/v2/video/${videoId}.json`).
    pipe(
      map(resData => {
        return resData;
      }));
  }

  getEmbedVimeoVideo(videoURL: string) {
    return this.http.get<VideoResponseData>(`https://vimeo.com/api/oembed.json?url=${videoURL}`).
    pipe(
      map(resData => {
        return resData;
      }));
  }

}
