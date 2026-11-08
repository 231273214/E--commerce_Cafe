import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  readonly added = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  formattedPrice = computed(() => '$' + this.product().price.toLocaleString('es-CO'));

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  onAdd() {
    this.addToCart.emit(this.product());
    this.added.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.added.set(false), 1600);
  }
}