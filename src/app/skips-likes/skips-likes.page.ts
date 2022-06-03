import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../types/user';

@Component({
  selector: 'app-skips-likes',
  templateUrl: './skips-likes.page.html',
  styleUrls: ['./skips-likes.page.scss'],
})
export class SkipsLikesPage implements OnInit {
  public likes: User[];
  constructor(private _cacheService: StorageService) {}

  ngOnInit() {}
  fetchLikes() {
    if (this._cacheService.checkCache('likes')) {
      const likes = this._cacheService.getCache('likes');
    }
  }
  fetchDislikes() {
    if (this._cacheService.checkCache('dislikes')) {
      const dislikes = this._cacheService.getCache('dislikes');
    }
  }
}
