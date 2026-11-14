import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private router = inject(Router);

  scrollTopIfCurrent(path: string): void {
    const current = this.router.url.split('?')[0].split('#')[0];
    if (current === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
