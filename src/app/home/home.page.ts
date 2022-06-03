import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/restApi.service';
import { StorageService } from '../services/storage.service';
import { User } from '../types/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  #users: User[] = [];
  public isUsersAvailable: boolean;
  public currentUser: User;
  constructor(
    private _restService: RestApiService,
    private _cs: StorageService
  ) {}
  public sort(arrObj: User[]) {
    const compare = (a: User, b: User) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    };
    return arrObj.sort(compare);
  }
  getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  ngOnInit() {
    const users = this._cs.getCache('users');
    if (users) {
      this.#users = users;
      // if (this._cs.checkCache('revertedLikes')) {
      // const revertedLikes = this._cs.getCache('revertedLikes');

      // const unique = this.getUniqueListBy(
      //   [...this.#users, ...revertedLikes],
      //   'id'
      // );
      // this.#users = this.sort(unique);
      // console.log(this.#users);
      // }
      const currentIndex = this._cs.getCache('currentIndex');
      if (currentIndex) {
        this.setCurrentUser(currentIndex);
      } else {
        this.setCurrentUser(0);
      }
    } else {
      this.getMessages();
    }
  }

  getMessages() {
    this._restService.getMessages().subscribe(
      (res: any) => {
        console.log('response is ', res);
        if (res.success === 1) {
          this.#users = res.users;
          this.setCurrentUser(0);
          this._cs.storeToCache('users', this.#users);
          // this._cs.storeToCache('msg', this.#users);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  setCurrentUser(id: number) {
    this.#users = this.#users.filter((e) => e.id !== id);
    const rvl = this._cs.getCache('revertedLikes');
    const rvs = this._cs.getCache('revertedSkips');
    const checkRvl = rvl && rvl.length;
    const checkRvs = rvs && rvs.length;

    if (checkRvl) {
      const unique = this.getUniqueListBy([...rvl, ...this.#users], 'id');
      this.#users = this.sort(unique);
    }
    if (checkRvs) {
      const unique = this.getUniqueListBy([...rvs, ...this.#users], 'id');
      this.#users = this.sort(unique);
    }

    console.log(
      'rvl is',
      rvl,
      'rvs is',
      rvs,
      'check rvl is ',
      checkRvl,
      'check rvs is ',
      checkRvs
    );
    console.log('is id same rvl', checkRvl && rvl[0]?.id == this.#users[0].id);

    if (checkRvl && rvl[0]?.id == this.#users[0].id) {
      rvl.shift();
      this._cs.storeToCache('revertedLikes', rvl);
    }
    if (checkRvs && rvs[0]?.id == this.#users[0].id) {
      rvs.shift();
      this._cs.storeToCache('revertedSkips', rvs);
    }

    this.currentUser = this.#users[0];
    this._cs.storeToCache('users', this.#users);
  }

  dislike(id: number) {
    this._cs.storeToCache('currentIndex', id);

    const users = this._cs.getCache('skips');
    if (users) {
      users.push(this.currentUser);
      this._cs.storeToCache('skips', users);
    } else {
      this._cs.storeToCache('skips', [this.currentUser]);
    }
    this.setCurrentUser(id);
  }
  like(id: number) {
    this._cs.storeToCache('currentIndex', id);
    const users = this._cs.getCache('likes');
    if (users) {
      users.push(this.currentUser);
      this._cs.storeToCache('likes', users);
    } else {
      this._cs.storeToCache('likes', [this.currentUser]);
    }
    this.setCurrentUser(id);
  }

  clear() {
    this._cs.deleteFromCache('currentIndex');
    this._cs.deleteFromCache('users');
    this._cs.deleteFromCache('likes');
    this._cs.deleteFromCache('skips');
    this._cs.deleteFromCache('revertedLikes');
    this._cs.deleteFromCache('revertedSkips');
    this.ngOnInit();
  }
}
