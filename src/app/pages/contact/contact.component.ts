import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Field = 'name' | 'lastname' | 'email' | 'message';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  hasError(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');

    try {
      // TODO: enviar this.form.getRawValue() a un servicio (EmailJS, Formspree, backend...)
      await new Promise(resolve => setTimeout(resolve, 600));
      this.status.set('success');
      this.form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
