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
  IonInputPasswordToggle,
  IonItem,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eye, eyeOffOutline, key, mail } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { AuthheaderComponent } from 'src/app/components/authheader/authheader.component';

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
    AuthheaderComponent,
    IonInputPasswordToggle,
  ],
})
export class LoginPage implements OnInit {
  isLoading: boolean = false;
  constructor() {
    addIcons({ mail, key, eye, eyeOffOutline });
  }

  ngOnInit() {}
  onSubmit(event: NgForm) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
}
