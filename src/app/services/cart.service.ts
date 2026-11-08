import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Product, ProductService } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string; // ISO
  customer: { name: string; email: string };
  items: { name: string; price: number; quantity: number }[];
  total: number;
}

const CART_KEY = 'cafe_cart';
const ORDERS_KEY = 'cafe_orders';
const MAX_QUANTITY = 99;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productService = inject(ProductService);

  private _items = signal<CartItem[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly isOpen = signal(false);

  readonly count = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly total = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  constructor() {
    // Guarda el carrito cada vez que cambia
    effect(() => {
      const data = this._items().map(i => ({ id: i.product.id, quantity: i.quantity }));
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(data));
      } catch {
        /* almacenamiento no disponible: el carrito funciona igual, solo no persiste */
      }
    });
  }

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  add(product: Product) {
    this._items.update(items => {
      const found = items.find(i => i.product.id === product.id);
      if (!found) return [...items, { product, quantity: 1 }];
      return items.map(i =>
        i.product.id === product.id
          ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) }
          : i
      );
    });
  }

  increase(id: number) {
    this._items.update(items =>
      items.map(i =>
        i.product.id === id ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i
      )
    );
  }

  decrease(id: number) {
    this._items.update(items =>
      items.map(i =>
        i.product.id === id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
      )
    );
  }

  remove(id: number) {
    this._items.update(items => items.filter(i => i.product.id !== id));
  }

  clear() {
    this._items.set([]);
  }

  /** Registra la compra (simulada), la guarda en el historial local y vacía el carrito. */
  checkout(customer: { name: string; email: string }): Order {
    const order: Order = {
      id: 'CF-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      customer,
      items: this._items().map(i => ({
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity
      })),
      total: this.total()
    };

    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const orders: Order[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
    } catch {
      /* sin almacenamiento: la compra se confirma igual */
    }

    this.clear();
    return order;
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];

      const saved: { id: number; quantity: number }[] = JSON.parse(raw);
      const catalog = this.productService.getProducts();

      return saved.flatMap(s => {
        const product = catalog.find(p => p.id === s.id);
        return product && s.quantity > 0 ? [{ product, quantity: s.quantity }] : [];
      });
    } catch {
      return [];
    }
  }
}