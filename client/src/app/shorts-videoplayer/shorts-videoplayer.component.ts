import { Component, QueryList, ViewChildren, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';

interface VideoItem {
  title: string;
  videoId: string;
}

@Component({
  selector: 'app-shorts-videoplayer',
  templateUrl: './shorts-videoplayer.component.html',
  styleUrls: ['./shorts-videoplayer.component.scss'],
})
export class ShortsVideoPlayer implements AfterViewInit, OnInit {
  currentIndex = 0;

  items: VideoItem[] = [
    { title: 'Jeremy Clarkson', videoId: 'J12q7fDYDFs' },
    { title: 'Bohemian Rhapsody', videoId: 'tgbNymZ7vqY' },
    { title: 'DPRK Music', videoId: 'GTLmzAP_sv0' },
    { title: '4 Jahre BKP', videoId: 'fMegboGSycw' },
    { title: 'Drogenkonsum in Luzern explodiert!', videoId: 'Kouxe0bsSJY' }
  ];

  @ViewChildren('videoFrame') videoFrames!: QueryList<ElementRef<HTMLIFrameElement>>;
constructor(private video:VideoService){}
  ngAfterViewInit(): void {
    setTimeout(() => this.updateVideoStates(), 0);
  }

  ngOnInit(): void {
    this.video.getVideos().subscribe((videos)=>{
      this.items = videos
    })
  }

selectVideo(index: number) {
  const wrappedIndex = this.getWrappedIndex(index);
  if (wrappedIndex !== this.currentIndex) {
    this.currentIndex = wrappedIndex;
    this.updateVideoStates();
  }
}

  updateVideoStates() {
    const iframes = this.videoFrames.toArray();
    for (let i = 0; i < iframes.length; i++) {
      const iframe = iframes[i].nativeElement;
      // const idx = this.currentIndex + i - 1;
      if (i === this.currentIndex) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
      }
    }
  }

  getWrappedIndex(index: number): number {
  const len = this.items.length;
  return ((index % len) + len) % len;
}


}