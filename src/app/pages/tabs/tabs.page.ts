import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cartOutline,
  fastFoodOutline,
  homeOutline,
  informationCircleOutline,
  personCircleOutline,
  searchOutline,
} from 'ionicons/icons';
import { CartService } from 'src/app/services/cartservice';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonTab,
    IonBadge,
    IonLabel,
  ],
})
export class TabsPage implements OnInit {
  cartData = inject(CartService);
  totalCount = 0;
  constructor() {
    addIcons({
      homeOutline,
      searchOutline,
      cartOutline,
      fastFoodOutline,
      informationCircleOutline,
      personCircleOutline,
    });
  }

  ngOnInit() {
    this.cartData.cart$.subscribe(() => {
      this.totalCount = this.cartData.getTotalCount();
    });
  }
}
