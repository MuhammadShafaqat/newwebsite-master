import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shorts-video', // Verify the correct selector here
  templateUrl: './shortsvideo.component.html',
  styleUrls: ['./shortsvideo.component.scss'],
})
export class ShortsVideo {
  @Input() videoInfo: any = '';
  dangerousVideoUrl: string = '';
  videoUrl: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.createVideoUrl();
  }

  createVideoUrl() {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.videoInfo.videoId;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.dangerousVideoUrl
    );
  }
}
