import { Component } from '@angular/core';

@Component({
  selector: 'app-titlescreen',
  templateUrl: './titlescreen.component.html',
  styleUrls: ['./titlescreen.component.scss'],
})
export class TitlescreenComponent {
  items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ];

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }
}
