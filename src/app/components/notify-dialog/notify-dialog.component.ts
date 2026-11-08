import {
  Component, DestroyRef, ElementRef, HostListener, computed, effect, inject, input, output, viewChild
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotifyService } from '../../services/notify.service';

export interface NotifyTarget {
  key: string;
  name: string;
}

@Component({
  selector: 'app-notify-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './notify-dialog.component.html',
  styleUrl: './notify-dialog.component.scss'
})
export class NotifyDialogComponent {
  target = input.required<NotifyTarget>();
  closed = output<void>();

  private notify = inject(NotifyService);
  private fb = inject(FormBuilder);

  readonly subscription = computed(() => this.notify.get(this.target().key));

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  private firstFocus = viewChild<ElementRef<HTMLElement>>('firstFocus');

  constructor() {
    document.body.style.overflow = 'hidden';
    inject(DestroyRef).onDestroy(() => (document.body.style.overflow = ''));

    effect(() => this.firstFocus()?.nativeElement.focus());
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closed.emit();
  }

  hasError(): boolean {
    const control = this.form.controls.email;
    return control.invalid && (control.touched || control.dirty);
  }

  subscribe() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { key, name } = this.target();
    this.notify.subscribe(key, name, this.form.controls.email.value);
  }

  unsubscribe() {
    this.notify.unsubscribe(this.target().key);
    this.closed.emit();
  }
}