import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { IonSkeletonText } from '@ionic/angular/standalone';

register();

export interface SlideItem {
  id: number;
  image: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, IonSkeletonText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @Input() slides: SlideItem[] = [];
  @Input() loading = true;
}
