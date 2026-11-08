import { Injectable } from '@angular/core';

export type PerkIcon = 'truck' | 'shield' | 'gift';

export interface Perk {
  icon: PerkIcon;
  label: string;
}

export interface Capsule {
  id: number;
  name: string;
  description: string;
  size: string;
  price: number;
  image?: string;
}

export interface Machine {
  id: number;
  name: string;
  description: string;
  price: number;
  perks: Perk[];
  image?: string;
}

export interface Accessory {
  id: number;
  name: string;
  price: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UpcomingProductsService {
  private readonly defaultPerks: Perk[] = [
    { icon: 'truck', label: 'Envío gratis' },
    { icon: 'shield', label: '1 año de garantía' },
    { icon: 'gift', label: 'Caja de degustación' }
  ];

  // Para agregar una imagen: image: 'Capsula_Ritmo_Claro.png' (archivo en la carpeta public)
  private readonly capsules: Capsule[] = [
    {
      id: 1,
      name: 'Ritmo Claro',
      description: 'Café con Melena de León, té verde y menta. Caja de 10 cápsulas.',
      size: 'Lungo (110 ml)',
      image: 'assets/images/proximamente/cafe_ritmo_claro.png',
      price: 28000
    },
    {
      id: 2,
      name: 'Foco Dorado',
      description: 'Café con Reishi, cúrcuma y jengibre. Caja de 10 cápsulas.',
      size: 'Lungo (110 ml)',
      image: 'assets/images/proximamente/cafe_foco_dorado.png',
      price: 29500
    },
    {
      id: 3,
      name: 'Brisa Clara',
      description: 'Café con Cordyceps, L-Theanine y miel. Caja de 10 cápsulas.',
      size: 'Lungo (110 ml)',
      image: 'assets/images/proximamente/cafe_brisa_clara.png',
      price: 27000
    }
  ];

  private readonly machines: Machine[] = [
    {
      id: 1,
      name: 'Origen Compacta',
      description: 'Máquina de cápsulas ideal para escritorios y cocinas pequeñas. Depósito de 0,6 L.',
      price: 389900,
      image: 'assets/images/proximamente/origen_compacta.png',
      perks: this.defaultPerks
    },
    {
      id: 2,
      name: 'Origen Plus',
      description: 'Calentamiento rápido y apagado automático. Depósito de 1 L.',
      price: 549900,
      image: 'assets/images/proximamente/origen_plus.png',
      perks: this.defaultPerks
    },
    {
      id: 3,
      name: 'Origen Pro',
      description: 'Temperatura y cantidad de agua programables. Depósito de 1,2 L.',
      price: 799900,
      image: 'assets/images/proximamente/origen_pro.png',
      perks: this.defaultPerks
    }
  ];

  private readonly accessories: Accessory[] = [
    { id: 1, name: 'Copa Degustación', price: 45000, image: 'assets/images/proximamente/copa_degustacion.png'},
    { id: 2, name: 'Vaso Térmico 350 ml', price: 69000, image: 'assets/images/proximamente/vaso_termico.png'},
    { id: 3, name: 'Cuchara Dosificadora', price: 18000, image: 'assets/images/proximamente/cuchara_dosificadora.png'}
  ];

  getCapsules(): Capsule[] {
    return this.capsules;
  }

  getMachines(): Machine[] {
    return this.machines;
  }

  getAccessories(): Accessory[] {
    return this.accessories;
  }
}