import { Component, inject, signal } from '@angular/core';
import { NotifyDialogComponent, NotifyTarget } from '../../components/notify-dialog/notify-dialog.component';
import { NotifyService } from '../../services/notify.service';
import { UpcomingProductsService } from '../../services/upcoming-products.service';

@Component({
  selector: 'app-proximamente',
  imports: [NotifyDialogComponent],
  templateUrl: './proximamente.component.html',
  styleUrl: './proximamente.component.scss'
})
export class ProximamenteComponent {
  private service = inject(UpcomingProductsService);
  private notify = inject(NotifyService);

  readonly capsules = this.service.getCapsules();
  readonly machines = this.service.getMachines();
  readonly accessories = this.service.getAccessories();

  readonly selected = signal<NotifyTarget | null>(null);

  formatPrice(value: number): string {
    return '$' + value.toLocaleString('es-CO');
  }

  isNotifying(key: string): boolean {
    return this.notify.isSubscribed(key);
  }

  notifyLabel(key: string, name: string): string {
    return this.isNotifying(key)
      ? `Ya te avisaremos cuando ${name} esté disponible`
      : `Avisarme cuando ${name} esté disponible`;
  }

  openNotify(key: string, name: string) {
    this.selected.set({ key, name });
  }

  closeNotify() {
    this.selected.set(null);
  }
}