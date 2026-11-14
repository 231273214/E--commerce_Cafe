import { Injectable, effect, signal } from '@angular/core';

export interface NotifyRequest {
  key: string;  
  name: string;
  email: string;
  date: string; 
}

const NOTIFY_KEY = 'cafe_notify';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private _requests = signal<NotifyRequest[]>(this.load());

  readonly requests = this._requests.asReadonly();

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(NOTIFY_KEY, JSON.stringify(this._requests()));
      } catch {
      }
    });
  }

  get(key: string): NotifyRequest | undefined {
    return this._requests().find(r => r.key === key);
  }

  isSubscribed(key: string): boolean {
    return !!this.get(key);
  }

  subscribe(key: string, name: string, email: string) {
    const request: NotifyRequest = { key, name, email, date: new Date().toISOString() };
    this._requests.update(list => [request, ...list.filter(r => r.key !== key)]);
  }

  unsubscribe(key: string) {
    this._requests.update(list => list.filter(r => r.key !== key));
  }

  private load(): NotifyRequest[] {
    try {
      const raw = localStorage.getItem(NOTIFY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}