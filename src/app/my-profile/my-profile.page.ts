import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _cacheServive: StorageService
  ) {}
  isFormVisible = false;
  public genders = ['Male', 'Female'];
  public me: {
    name: string;
    age: string;
    gender: string;
    aboutMe: string;
  } = {
    name: '',
    age: '',
    gender: '',
    aboutMe: '',
  };
  ngOnInit() {
    this.initProfile();
  }
  form = this._fb.group({
    name: [null, [Validators.required, Validators.minLength(4)]],
    age: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
    gender: [null, [Validators.required]],
    aboutMe: [null, [Validators.required]],
  });
  initProfile() {
    if (this._cacheServive.checkCache('me')) {
      this.me = this._cacheServive.getCache('me');
    }
  }
  edit() {
    this.isFormVisible = true;
    const { name, gender, aboutMe, age } = this.me;
    this.form.patchValue({
      name,
      age,
      aboutMe,
      gender,
    });
  }
  saveDetails() {
    if (this.form.invalid) {
      this.#hasError = true;
      return;
    }
    this.me = this.form.value;
    this.isFormVisible = false;
    this._cacheServive.storeToCache('me', this.form.value);
  }

  #hasError = false;
  invalid(controlName: any) {
    return (
      (this.form.get(controlName)!.invalid &&
        this.form.get(controlName)!.touched) ||
      (this.#hasError && this.form.get(controlName).invalid)
    );
  }
}
