import { Component, ElementRef, HostListener, computed, inject, input, output, signal } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
}

let nextId = 0;

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  /** La primera opción se considera la "por defecto" y muestra el placeholder. */
  options = input.required<SelectOption[]>();
  value = input.required<string>();
  placeholder = input('Seleccionar');
  ariaLabel = input('');
  valueChange = output<string>();

  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly listId = `select-list-${nextId++}`;
  readonly isOpen = signal(false);
  readonly activeIndex = signal(0);

  readonly selectedIndex = computed(() =>
    this.options().findIndex(o => o.value === this.value())
  );

  readonly buttonLabel = computed(() => {
    const index = this.selectedIndex();
    return index > 0 ? this.options()[index].label : this.placeholder();
  });

  open() {
    this.activeIndex.set(Math.max(this.selectedIndex(), 0));
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  select(index: number) {
    const option = this.options()[index];
    if (option) this.valueChange.emit(option.value);
    this.close();
  }

  onClick(event: MouseEvent) {
    // detail === 0 es un "clic" generado por teclado; el teclado se maneja en onKeydown
    if (event.detail === 0) return;
    this.isOpen() ? this.close() : this.open();
  }

  onKeydown(event: KeyboardEvent) {
    const last = this.options().length - 1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.open();
        else this.activeIndex.update(i => Math.min(i + 1, last));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) this.open();
        else this.activeIndex.update(i => Math.max(i - 1, 0));
        break;
      case 'Home':
        if (this.isOpen()) {
          event.preventDefault();
          this.activeIndex.set(0);
        }
        break;
      case 'End':
        if (this.isOpen()) {
          event.preventDefault();
          this.activeIndex.set(last);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen()) this.select(this.activeIndex());
        else this.open();
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}