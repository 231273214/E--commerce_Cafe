import { Component, ElementRef, HostListener, effect, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService, Order } from '../../services/cart.service';

type View = 'cart' | 'checkout' | 'success';
type Field = 'name' | 'email';

@Component({
  selector: 'app-cart-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.scss'
})
export class CartPanelComponent {
  readonly cart = inject(CartService);
  private fb = inject(FormBuilder);

  readonly view = signal<View>('cart');
  readonly order = signal<Order | null>(null);
  readonly sending = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  private closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  constructor() {
    // Lleva el foco al botón de cerrar cuando el panel se abre
    effect(() => this.closeBtn()?.nativeElement.focus());

    // Bloquea el scroll de la página mientras el panel está abierto
    effect(() => {
      document.body.style.overflow = this.cart.isOpen() ? 'hidden' : '';
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.cart.isOpen()) this.close();
  }

  close() {
    this.cart.close();
    if (this.view() === 'success') {
      this.view.set('cart');
      this.order.set(null);
    }
  }

  hasError(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  formatPrice(value: number): string {
    return '$' + value.toLocaleString('es-CO');
  }

  async confirm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);

    // Pago y correo de confirmación simulados (tienda de demostración)
    await new Promise(resolve => setTimeout(resolve, 800));

    const order = this.cart.checkout(this.form.getRawValue());
    this.order.set(order);
    this.sending.set(false);
    this.view.set('success');
    this.form.reset();
  }
}
