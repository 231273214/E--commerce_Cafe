import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  sortOption: string = ''; 

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
  }

  search() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    this.applySort();
  }

  applySort() {
    if (this.sortOption === 'price') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'name') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  filteredByCategory(category: string): Product[] {
    const query = this.searchQuery.toLowerCase();
    let products = this.products.filter(p =>
      p.category === category &&
      p.name.toLowerCase().includes(query)
    );

    if (this.sortOption === 'price') {
      products.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'name') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }
}

