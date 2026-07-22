import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { CartService } from 'src/app/services/cartservice';
import { addIcons } from 'ionicons';
import { add, remove, trashOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonButtons,
    IonFooter,
  ],
})
export class CartPage implements OnInit {
  cartService = inject(CartService);
  cartItems = this.cartService.cart;
  alertCtrl = inject(AlertController);
  router = inject(Router);
  toastCtrl = inject(ToastController);
  deliveryCharge = 50;

  constructor() {
    addIcons({ remove, add, trashOutline });
  }

  get subTotal(): number {
    return this.cartService.total();
  }

  get grandTotal(): number {
    return this.subTotal + this.deliveryCharge;
  }

  add(item: MenuItem) {
    this.cartService.add(item);
  }

  remove(item: MenuItem) {
    this.cartService.remove(item);
  }

  async confirmClearCart() {
    const alert = await this.alertCtrl.create({
      header: 'Clear Cart?',
      message:
        'This will remove all items from your cart. This action cannot be undone.',
      cssClass: 'clear-cart-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Clear Cart',
          role: 'destructive',
          cssClass: 'alert-danger-btn',
          handler: async () => {
            await this.cartService.clear();
            const toast = await this.toastCtrl.create({
              message: 'Cart cleared',
              duration: 1500,
              position: 'bottom',
              color: 'dark',
            });
            toast.present();
          },
        },
      ],
    });

    await alert.present();
  }

  goToMenu() {
    this.router.navigate(['/tabs/home']);
  }

  ngOnInit() {
    console.log('this', this.cartItems());
  }
}
