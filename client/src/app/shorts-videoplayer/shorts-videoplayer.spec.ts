import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsVideoPlayer } from './shorts-videoplayer.component';

describe('CustomContentSliderComponent', () => {
  let component: ShortsVideoPlayer;
  let fixture: ComponentFixture<ShortsVideoPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortsVideoPlayer],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortsVideoPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
