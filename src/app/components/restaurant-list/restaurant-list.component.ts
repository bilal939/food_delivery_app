import { Component, Input, OnInit } from '@angular/core';
import { SkeletonCardsLoadingComponent } from '../skeleton-cards-loading/skeleton-cards-loading.component';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
  imports: [SkeletonCardsLoadingComponent, RestaurantCardComponent],
})
export class RestaurantListComponent implements OnInit {
  @Input() loading: boolean = false;
  skeletonItems = [1, 2, 3, 4, 5];
  @Input() results: Restaurant[] = [];
  constructor() {}

  ngOnInit() {}
}
