import { Component, signal } from '@angular/core';
import { TeamMemberComponent } from '../../components/team-member/team-member.component';

@Component({
  selector: 'app-about',  
  imports: [TeamMemberComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly story = [
    {
      number: '01',
      title: 'Coffee',
      text: 'Nuestra historia comienza en las montañas colombianas, donde nace uno de los cafés más apreciados del mundo. Inspirados por su sabor y energía natural, decidimos ir más allá: crear una bebida que no solo despierte el cuerpo, sino también la mente.'
    },
    {
      number: '02',
      title: 'Coffee and fungus',
      text: 'Desde hace siglos, culturas orientales han utilizado hongos funcionales como el Lion’s Mane, Reishi y Cordyceps por sus propiedades para la memoria, el enfoque y el equilibrio del cuerpo. Hoy, la ciencia moderna respalda sus beneficios como adaptógenos y nootrópicos. Al combinarlos con café, obtenemos una bebida poderosa.'
    }
  ];

  readonly valueCards = [
    {
      key: 'mision',
      title: 'Misión',
      image: 'Foto_Mision.png',
      text: 'Nuestra misión es proporcionar un café funcional de alta calidad que potencie el bienestar cognitivo de forma natural.'
    },
    {
      key: 'vision',
      title: 'Visión',
      image: 'Foto_Vision.png',
      text: 'Ser líderes en innovación de productos naturales que mejoren la salud mental y el estilo de vida de nuestros consumidores.'
    }
  ];

  readonly team = [
    {
      name: 'Sofia',
      photo: 'maria.jpg',
      description: 'Apasionada por la nutrición y el bienestar mental, Sofia fusionó su amor por el café colombiano con el poder de los hongos adaptógenos. Cree firmemente en crear productos que alimenten el cuerpo y eleven la mente.'
    },
    {
      name: 'Daniel',
      photo: 'jorge.jpeg',
      description: 'Con experiencia en agroindustria y procesos de tostión, Daniel se encarga de garantizar que cada grano conserve su esencia natural. Su objetivo es ofrecer un café que combine sabor excepcional y funcionalidad real.'
    },
    {
      name: 'Jose',
      photo: 'julio.jpeg',
      description: 'Jose es quien transforma la visión en una experiencia visual y sensorial. Desde el empaque hasta la plataforma digital, cuida cada detalle para que el producto se sienta tan bien como sabe.'
    }
  ];

  private flipped = signal<string[]>([]);

  isFlipped(key: string): boolean {
    return this.flipped().includes(key);
  }

  toggleCard(key: string) {
    this.flipped.update(list =>
      list.includes(key) ? list.filter(k => k !== key) : [...list, key]
    );
  }
}