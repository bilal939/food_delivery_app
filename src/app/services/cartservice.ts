// services/cart.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { MenuItem } from '../models/menu-item.model';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

const CART_STORAGE_KEY = 'cart_data';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSignal = signal<CartItem[]>([]);

  cart = this.cartSignal.asReadonly();

  total = computed(() =>
    this.cartSignal().reduce((sum, c) => sum + c.item.price * c.quantity, 0),
  );

  totalCount = computed(() =>
    this.cartSignal().reduce((sum, c) => sum + c.quantity, 0),
  );

  constructor() {
    this.restoreCart();
  }

  private async restoreCart() {
    const { value } = await Preferences.get({ key: CART_STORAGE_KEY });
    if (value) {
      try {
        const parsed: CartItem[] = JSON.parse(value);
        this.cartSignal.set(parsed);
      } catch {
        this.cartSignal.set([]);
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
    this.cartSignal.set(updated);
    this.persistCart(updated); // fire-and-forget
  }

  getQuantity(itemId: number): number {
    return this.cartSignal().find((c) => c.item.id === itemId)?.quantity ?? 0;
  }

  add(item: MenuItem) {
    this.cartSignal.update((cart) => {
      const existing = cart.find((c) => c.item.id === item.id);
      const updated = existing
        ? cart.map((c) =>
            c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
          )
        : [...cart, { item, quantity: 1 }];
      this.persistCart(updated);
      return updated;
    });
  }

  remove(item: MenuItem) {
    this.cartSignal.update((cart) => {
      const existing = cart.find((c) => c.item.id === item.id);
      if (!existing) return cart;

      const updated =
        existing.quantity <= 1
          ? cart.filter((c) => c.item.id !== item.id)
          : cart.map((c) =>
              c.item.id === item.id ? { ...c, quantity: c.quantity - 1 } : c,
            );

      this.persistCart(updated);
      return updated;
    });
  }

  async clear() {
    this.cartSignal.set([]);
    await Preferences.remove({ key: CART_STORAGE_KEY });
  }
}
