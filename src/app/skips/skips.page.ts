import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { User } from '../types/user';

@Component({
  selector: 'app-skips',
  templateUrl: './skips.page.html',
  styleUrls: ['./skips.page.scss'],
})
export class SkipsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  #infinteScorllStart = 0;
  #skips2: User[] = [];
  #skipLen = 0;
  public skips: User[] = [];

  constructor(private _cacheService: StorageService) {}

  loadData(event) {
    this.#infinteScorllStart = this.#infinteScorllStart + 5;
    this.sliceArr(this.#infinteScorllStart);
    console.log('Done');
    event.target.complete();

    if (this.skips.length >= this.#skipLen) {
      event.target.disabled = true;
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  sliceArr(start) {
    const msgs = this.#skips2.slice(start, start + 5);
    this.skips = [...this.skips, ...msgs];
    console.log(msgs);
  }

  ngOnInit() {
    this.#skips2 = this._cacheService.getCache('skips');
    if (!!this.#skips2) {
      this.#skipLen = this.#skips2.length;
      this.sliceArr(0);
    }
  }

  delete(skip: User) {
    const id = skip.id;
    this.#skips2 = this.#skips2.filter((e) => e.id !== id);
    this.skips = this.skips.filter((e) => e.id !== id);

    let revertedSkips = this._cacheService.getCache('revertedSkips');
    if (!!revertedSkips) revertedSkips = [...revertedSkips, skip];
    else revertedSkips = [skip];

    this._cacheService.storeToCache('skips', this.#skips2);
    this._cacheService.storeToCache('revertedSkips', revertedSkips);
  }
}
