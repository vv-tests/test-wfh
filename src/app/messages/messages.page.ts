import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RestApiService } from '../services/restApi.service';
import { StorageService } from '../services/storage.service';
import { User } from '../types/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public messages: User[] = [];
  #infinteScorllStart = 0;

  loadData(event) {
    console.log(event);
    this.#infinteScorllStart = this.#infinteScorllStart + 5;
    this.sliceArr(this.#infinteScorllStart);
    // console.log('Done', this.#infinteScorllStart, this.messages.length);
    event.target.complete();

    if (this.messages.length > 24) {
      event.target.disabled = true;
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  constructor(
    private _cacheService: StorageService,
    private _restService: RestApiService
  ) {
    this.#infinteScorllStart = this._cacheService.getCache('msgStart') ?? 0;
  }

  sliceArr(start) {
    const msg = this._cacheService.getCache('msg2');
    if (msg) {
      const msg3 = msg.slice(start, start + 5);
      this.messages = [...this.messages, ...msg3];
      this._cacheService.storeToCache('msg', this.messages);
      this._cacheService.storeToCache('msgStart', this.#infinteScorllStart);
      console.log(this.messages);
    }
  }

  ngOnInit() {
    const msg = this._cacheService.getCache('msg');

    if (!!msg && msg.length) {
      this.messages = msg;
    } else {
      this.getMessages();
    }
  }
  getMessages() {
    this._restService.getMessages().subscribe(
      (res: any) => {
        if (res.success === 1) {
          // this.#messages2 = res.users;
          this._cacheService.storeToCache('msg2', res.users);
          this.sliceArr(this.#infinteScorllStart);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  moveUp(msg) {
    const updated = this.messages.filter((e: User) => e.id !== msg.id);
    updated.unshift(msg);
    this.messages = updated;
    this._cacheService.storeToCache('msg', this.messages);
  }
  delete(id) {
    this.messages = this.messages.filter((e: User) => e.id !== id);
    this._cacheService.storeToCache('msg', this.messages);
  }
}
