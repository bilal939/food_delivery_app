import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DUMMY_RESTAURANTS, Restaurant } from 'src/app/models/restaurant.model';
import { addIcons } from 'ionicons';
import {
  add,
  addOutline,
  locationOutline,
  remove,
  removeOutline,
  star,
} from 'ionicons/icons';
import { GroupedMenuCategory } from 'src/app/models/grouped-menu-category.model';
import {
  DUMMY_CATEGORIES,
  DUMMY_MENU_ITEMS,
} from 'src/app/constants/app-dummy';
import { MenuItem } from 'src/app/models/menu-item.model';
import { CartService } from 'src/app/services/cartservice';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonRow,
    IonText,
    IonFooter,
  ],
})
export class RestaurantDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  restaurant: Restaurant | null = null;
  id: number = 0;
  menuCategories: GroupedMenuCategory[] = [];
  cartTotal = 0;
  cartCount = 0;
  constructor() {
    addIcons({ locationOutline, star, add, remove });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('restaurantid'));
    this.id = id;
    this.restaurant =
      DUMMY_RESTAURANTS.find((item) => item.id === this.id) ?? null;

    const items = DUMMY_MENU_ITEMS.filter((i) => i.restaurantId === id);
    this.menuCategories = this.groupByCategory(items);
    this.cartService.cart$.subscribe(() => {
      this.cartTotal = this.cartService.getTotal();
      this.cartCount = this.cartService.getTotalCount();
    });
  }

  private groupByCategory(items: MenuItem[]): GroupedMenuCategory[] {
    const map = new Map<number, MenuItem[]>();

    for (const item of items) {
      if (!map.has(item.categoryId)) {
        map.set(item.categoryId, []);
      }
      map.get(item.categoryId)!.push(item);
    }

    return Array.from(map, ([categoryId, groupedItems]) => {
      const meta = DUMMY_CATEGORIES.find((c) => c.id === categoryId);
      return {
        categoryId,
        categoryName: meta?.name ?? 'Other',
        icon: meta?.icon ?? 'restaurant-outline',
        items: groupedItems,
      };
    });
  }

  add(item: MenuItem) {
    this.cartService.add(item);
  }

  remove(item: MenuItem) {
    this.cartService.remove(item);
  }

  qty(item: MenuItem): number {
    return this.cartService.getQuantity(item.id);
  }

  trackByCategory(_: number, cat: GroupedMenuCategory) {
    return cat.categoryId;
  }

  trackByItem(_: number, item: MenuItem) {
    return item.id;
  }
}
