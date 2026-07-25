import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, eyeOffOutline, key, mail } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonImg,
    IonInput,
    IonItem,
    IonIcon,
    IonText,
    IonSpinner,
    IonButton,
    RouterLink,
  ],
})
export class LoginPage implements OnInit {
  type: boolean = false;
  isLoading: boolean = false;
  constructor() {
    addIcons({ mail, key, eye, eyeOffOutline });
  }

  changeType() {
    this.type = !this.type;
  }

  ngOnInit() {}
  onSubmit(event: NgForm) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
}
