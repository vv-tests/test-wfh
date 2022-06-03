import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RestApiService } from '../services/restApi.service';
import { StorageService } from '../services/storage.service';
import { User } from '../types/user';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.page.html',
  styleUrls: ['./online-users.page.scss'],
})
export class OnlineUsersPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  #infinteScorllStart = 0;
  #messages2: User[] = [];
  public messages: User[] = [];

  constructor(
    private _cacheService: StorageService,
    private _restService: RestApiService
  ) {}

  loadData(event) {
    this.#infinteScorllStart = this.#infinteScorllStart + 5;
    this.sliceArr(this.#infinteScorllStart);
    console.log('Done');
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll

    if (this.messages.length >= 24) {
      event.target.disabled = true;
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  sliceArr(start) {
    const msgs = this.#messages2.slice(start, start + 5);
    console.log(msgs);
    this.messages = [...this.messages, ...msgs];
  }

  ngOnInit() {
    this.#messages2 = this._cacheService.getCache('online-users');
    if (!!this.#messages2) {
      this.sliceArr(0);
    } else {
      this.getMessages();
    }
  }
  getMessages() {
    this._restService.getMessages().subscribe(
      (res: any) => {
        console.log('response is ', res);
        if (res.success === 1) {
          this.#messages2 = res.users;
          this.sliceArr(0);
          this._cacheService.storeToCache('online-users', res.users);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
