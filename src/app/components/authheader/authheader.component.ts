import { Component, Input, OnInit } from '@angular/core';
import { IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-authheader',
  templateUrl: './authheader.component.html',
  styleUrls: ['./authheader.component.scss'],
  imports: [IonImg],
})
export class AuthheaderComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() imgSrc!: string;
  constructor() {}

  ngOnInit() {}
}
