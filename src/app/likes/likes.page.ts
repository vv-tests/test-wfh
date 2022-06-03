import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { User } from '../types/user';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  #infinteScorllStart = 0;
  #likes2: User[] = [];
  #likeLen = 0;
  public likes: User[] = [];

  constructor(private _cacheService: StorageService) {}

  loadData(event) {
    this.#infinteScorllStart = this.#infinteScorllStart + 5;
    this.sliceArr(this.#infinteScorllStart);
    console.log('Done');
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll

    if (this.likes.length >= this.#likeLen) {
      event.target.disabled = true;
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  sliceArr(start) {
    const msgs = this.#likes2.slice(start, start + 5);
    console.log(msgs);
    this.likes = [...this.likes, ...msgs];
  }

  ngOnInit() {
    if (this._cacheService.checkCache('likes')) {
      this.#likes2 = this._cacheService.getCache('likes');
      this.#likeLen = this.#likes2.length;
      this.sliceArr(0);
    } else {
    }
  }

  delete(like) {
    const id = like.id;
    this.likes = this.likes.filter((e) => e.id !== id);
    this.#likes2 = this.#likes2.filter((e) => e.id !== id);

    let revertedLikes = this._cacheService.getCache('revertedLikes');
    if (!!revertedLikes) revertedLikes = [...revertedLikes, like];
    else revertedLikes = [like];

    this._cacheService.storeToCache('likes', this.#likes2);
    this._cacheService.storeToCache('revertedLikes', revertedLikes);
  }
}
