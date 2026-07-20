import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
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
  library,
  personCircleOutline,
  playCircle,
  radio,
  search,
  searchOutline,
} from 'ionicons/icons';

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
    IonLabel,
  ],
})
export class TabsPage implements OnInit {
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

  ngOnInit() {}
}
