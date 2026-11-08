import { Component, computed, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { SelectComponent, SelectOption } from '../../components/select/select.component';

type CategoryFilter = 'todas' | Product['category'];
type PriceOrder = 'none' | 'asc' | 'desc';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, SelectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private productService = inject(ProductService);
  private products = this.productService.getProducts();
  private cart = inject(CartService);

  readonly sections: { key: Product['category']; title: string; description: string }[] = [
    {
      key: 'concentracion',
      title: 'Concentración',
      description: 'Productos pensados para enfoque, productividad y presencia mental:'
    },
    {
      key: 'memoria',
      title: 'Memoria',
      description: 'Productos que estimulan la retención, aprendizaje y agudeza cognitiva:'
    },
    {
      key: 'claridad',
      title: 'Claridad mental',
      description: 'Para limpieza mental, reducción de neblina mental (brain fog) y mayor lucidez:'
    }
  ];

  readonly categoryOptions: SelectOption[] = [
    { value: 'todas', label: 'Todas las categorías' },
    { value: 'concentracion', label: 'Concentración' },
    { value: 'memoria', label: 'Memoria' },
    { value: 'claridad', label: 'Claridad mental' }
  ];

  readonly orderOptions: SelectOption[] = [
    { value: 'none', label: 'Sin orden' },
    { value: 'asc', label: 'Menor a mayor' },
    { value: 'desc', label: 'Mayor a menor' }
  ];

  selectedCategory = signal<CategoryFilter>('todas');
  selectedOrder = signal<PriceOrder>('none');

  visibleSections = computed(() => {
    const category = this.selectedCategory();
    const order = this.selectedOrder();

    return this.sections
      .filter(section => category === 'todas' || section.key === category)
      .map(section => {
        const items = this.products.filter(p => p.category === section.key);
        //        ↑ si products es Signal → this.products().filter(...)
        if (order === 'asc') items.sort((a, b) => a.price - b.price);
        if (order === 'desc') items.sort((a, b) => b.price - a.price);
        return { ...section, products: items };
      });
  });

  onCategoryChange(value: string) {
    this.selectedCategory.set(value as CategoryFilter);
  }

  onOrderChange(value: string) {
    this.selectedOrder.set(value as PriceOrder);
  }

  onAddToCart(product: Product) {
    this.cart.add(product);
  }
}