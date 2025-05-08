import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-about',
  imports: [ NavbarComponent ],
  templateUrl: './about.Component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent { }