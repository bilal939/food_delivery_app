import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  SearchbarCustomEvent,
} from '@ionic/angular/standalone';
import { DUMMY_RESTAURANTS, Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantListComponent } from 'src/app/components/restaurant-list/restaurant-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RestaurantListComponent,
  ],
})
export class SearchPage implements OnInit {
  @ViewChild('searchbar') searchbar!: IonSearchbar;
  constructor() {}
  loading: boolean = false;
  results: Restaurant[] = DUMMY_RESTAURANTS;
  ngOnInit() {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 500);
  }

  onSearchedChange(event: SearchbarCustomEvent) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.loading = true;
    setTimeout(() => {
      this.results = DUMMY_RESTAURANTS.filter((d) =>
        d.dishName.toLocaleLowerCase().includes(query),
      );
      this.loading = false;
    }, 200);
  }
}
