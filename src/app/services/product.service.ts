import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  benefit: string;
  description: string;
  price: number;
  image: string;
  category: 'concentracion' | 'memoria' | 'claridad';
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Ritmo Claro',
      benefit: 'Enfoque • Calma',
      description: 'Café con Melena de León, té verde y menta.',
      price: 12000,
      image: 'assets/images/Ritmo_Claro.png',
      category: 'concentracion'
    },
    {
      id: 2,
      name: 'Pulso Activo',
      benefit: 'Energía • Presición',
      description: 'Café con Cordyceps, jengibre y canela.',
      price: 13500,
      image: 'assets/images/Pulso_Activo.png',
      category: 'concentracion'
    },
    {
      id: 3,
      name: 'Alerta Natural',
      benefit: 'Claridad • Estabilidad',
      description: 'Café scon Chaga, cacao puro y romero. ',
      price: 14000,
      image: 'assets/images/Alerta_Natural.png',
      category: 'concentracion'
    },
    {
      id: 4,
      name: 'Foco Dorado',
      benefit: 'Memoria • Equilibirio',
      description: 'Café con Reishi, cúrcuma y jengibre.',
      price: 13000,
      image: 'assets/images/Foco_Dorado.png',
      category: 'memoria'
    },
    {
      id: 5,
      name: 'Raíz viva',
      benefit: 'Retención • Estabilidad',
      description: 'Café con Melena de León, nuez moscada y cacao.',
      price: 14500,
      image: 'assets/images/Raiz_Viva.png',
      category: 'memoria'
    },
    {
      id: 6,
      name: 'Senda Suave',
      benefit: 'Concentración • Relajación',
      description: 'Café con Chaga, canela y avena.',
      price: 15000,
      image: 'assets/images/Senda_Suave.png',
      category: 'memoria'
    },
    {
      id: 7,
      name: 'Brisa Claea',
      benefit: 'Serenidad • Fluidez',
      description: 'Café con  Cordyceps, L-Theanine y miel.',
      price: 12500,
      image: 'assets/images/Brisa_Clara.png',
      category: 'claridad'
    },
    {
      id: 8,
      name: 'Luz interior',
      benefit: 'Lucidez • Inspiración',
      description: 'Café con Reishi, limón y romero',
      price: 11000,
      image: 'assets/images/Luz_Interior.png',
      category: 'claridad'
    },
    {
      id: 9,
      name: 'Día Sereno',
      benefit: 'Claridad • Ánimo',
      description: 'Café con Melena de León, vainilla y cardamomo.',
      price: 14000,
      image: 'assets/images/Dia_Sereno.png',
      category: 'claridad'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
