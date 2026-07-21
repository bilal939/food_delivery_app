// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { MenuItem } from '../models/menu-item.model';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

const CART_STORAGE_KEY = 'cart_data';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Restore cart from device storage the moment the app boots and
    // this singleton service is first created.
    this.restoreCart();
  }

  private get cart(): CartItem[] {
    return this.cartSubject.value;
  }

  private async restoreCart() {
    const { value } = await Preferences.get({ key: CART_STORAGE_KEY });
    if (value) {
      try {
        const parsed: CartItem[] = JSON.parse(value);
        this.cartSubject.next(parsed);
      } catch {
        // Corrupted or incompatible stored data — ignore and start fresh
        // rather than crashing the app on launch.
        this.cartSubject.next([]);
      }
    }
  }

  private async persistCart(cart: CartItem[]) {
    await Preferences.set({
      key: CART_STORAGE_KEY,
      value: JSON.stringify(cart),
    });
  }

  private updateCart(updated: CartItem[]) {
    this.cartSubject.next(updated);
    this.persistCart(updated); // fire-and-forget; UI already updated optimistically
  }

  getQuantity(itemId: number): number {
    return this.cart.find((c) => c.item.id === itemId)?.quantity ?? 0;
  }

  add(item: MenuItem) {
    const existing = this.cart.find((c) => c.item.id === item.id);
    const updated = existing
      ? this.cart.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        )
      : [...this.cart, { item, quantity: 1 }];
    this.updateCart(updated);
  }

  remove(item: MenuItem) {
    const existing = this.cart.find((c) => c.item.id === item.id);
    if (!existing) return;

    const updated =
      existing.quantity <= 1
        ? this.cart.filter((c) => c.item.id !== item.id)
        : this.cart.map((c) =>
            c.item.id === item.id ? { ...c, quantity: c.quantity - 1 } : c,
          );

    this.updateCart(updated);
  }

  getTotal(): number {
    return this.cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  }

  getTotalCount(): number {
    return this.cart.reduce((sum, c) => sum + c.quantity, 0);
  }

  async clear() {
    this.cartSubject.next([]);
    await Preferences.remove({ key: CART_STORAGE_KEY });
  }
}
