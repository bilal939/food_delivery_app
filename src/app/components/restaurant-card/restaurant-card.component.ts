import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, timeOutline, starSharp } from 'ionicons/icons';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCard, IonCardContent, IonIcon, IonBadge, IonThumbnail],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent {
  @Input({ required: true }) restaurant!: Restaurant;
  @Input() isLoading = true;
  constructor() {
    addIcons({ locationOutline, timeOutline, starSharp });
  }
}
