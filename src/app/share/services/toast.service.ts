import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any = [];

  show(header: string, body: string) {
    this.toasts.push({ header, body });
  }

}
