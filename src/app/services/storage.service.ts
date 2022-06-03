import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  getCache(name: string) {
    return JSON.parse(localStorage.getItem(name));
  }
  storeToCache(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }
  checkCache(name: string) {
    return !!localStorage.getItem(name);
  }
  deleteFromCache(name: string) {
    localStorage.removeItem(name);
  }
  clearCache() {
    localStorage.clear();
  }

  #dataSource = new BehaviorSubject<any>(null);
  public emittedUser = this.#dataSource.asObservable();

  updatedDataSelection(user: User) {
    this.#dataSource.next(user);
  }
  public sort(arrObj: User[]) {
    const compare = (a: User, b: User) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    };
    return arrObj.sort(compare);
  }
}
