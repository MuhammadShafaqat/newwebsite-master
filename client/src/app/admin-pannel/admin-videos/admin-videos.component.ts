import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminvideoService } from '../admin-services/adminvideo.service';
import { Video } from 'src/app/_models/video';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.scss']
})
export class AdminVideosComponent implements OnInit {
  videoId = '';
  videoTitle = '';
  videoList: Video[] = [];

  constructor(
    private http: HttpClient,
    private adminvideo: AdminvideoService
  ) {}

  ngOnInit() {
    this.loadVideos();
  }

  onSubmit() {
    if (!this.videoId) return;

    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${this.videoId}&format=json`;

    this.http.get<{ title: string }>(url).subscribe({
      next: (res) => {
        console.log(res)
        const video = { title: res.title, videoId: this.videoId };
        this.adminvideo.addVideo(video).subscribe(() => {
          this.loadVideos();
          this.videoId = '';
          this.videoTitle = '';
        });
      },
      error: () => {
        alert('Invalid Video ID or failed to fetch title');
      }
    });
  }

  loadVideos() {
    this.adminvideo.getVideos().subscribe((videos) => {
      this.videoList = videos;
    });
  }
}
