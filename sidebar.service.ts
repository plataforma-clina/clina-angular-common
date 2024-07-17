import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public $show = new BehaviorSubject<boolean>(false);

  show() {
    this.$show.next(true);
  }

  hide() {
    this.$show.next(false);
  }
}
