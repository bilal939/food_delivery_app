import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';
import {
  SlideItem,
  SliderComponent,
} from 'src/app/components/slider/slider.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    SliderComponent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonThumbnail,
    IonText,
  ],
})
export class HomePage implements OnInit {
  bannerSlides: SlideItem[] = [
    {
      id: 1,
      image: 'https://picsum.photos/id/10/600/300',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items',
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/20/600/300',
      title: 'New Arrivals',
      description: 'Check out our latest collection',
    },
    {
      id: 3,
      image: 'https://picsum.photos/id/30/600/300',
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
  ];
  loading = true;
  constructor() {
    addIcons({ chevronDownOutline });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
