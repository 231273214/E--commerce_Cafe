import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [ NavbarComponent, FooterComponent],
  templateUrl: './about.Component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent { }