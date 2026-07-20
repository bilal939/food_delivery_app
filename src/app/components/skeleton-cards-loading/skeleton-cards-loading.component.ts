import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonSkeletonText,
  IonThumbnail,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-skeleton-cards-loading',
  templateUrl: './skeleton-cards-loading.component.html',
  styleUrls: ['./skeleton-cards-loading.component.scss'],
  imports: [IonSkeletonText, IonCard, IonThumbnail, IonCardContent],
})
export class SkeletonCardsLoadingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
