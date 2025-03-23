import { Component } from '@angular/core';

interface VideoItem {
  title: string;
  videoId: string;
}

@Component({
  selector: 'app-shorts-videoplayer',
  templateUrl: './shorts-videoplayer.component.html',
  styleUrl: './shorts-videoplayer.component.scss',
})
export class ShortsVideoPlayer {
  currentIndex = 0;

  nextVideo() {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    }
  }
  prevVideo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  //For a new entry, you must create here a new VideoItem
  items: VideoItem[] = [
    { title: 'Jeremy Clarkson', videoId: "J12q7fDYDFs" },
    { title: 'Bohemian Rhapsedy', videoId: "tgbNymZ7vqY" },
    { title: 'DPRK Music', videoId: 'GTLmzAP_sv0' },
    { title: '4 Jahre BKP', videoId: 'fMegboGSycw' },
    { title: 'Drogenkonsum in Luzern explodiert!', videoId: 'Kouxe0bsSJY' }
  ]
}
