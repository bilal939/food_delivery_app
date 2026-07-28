// src/app/core/services/toast.service.ts
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastColor = 'success' | 'danger' | 'warning' | 'medium';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  private async show(message: string, color: ToastColor, duration = 2500) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'top',
      cssClass: 'app-toast',
      buttons: [{ icon: 'close-outline', role: 'cancel' }],
    });
    await toast.present();
  }

  success(message: string) {
    return this.show(message, 'success');
  }

  error(message: string) {
    return this.show(message, 'danger', 3500);
  }

  warning(message: string) {
    return this.show(message, 'warning');
  }

  info(message: string) {
    return this.show(message, 'medium');
  }
}
