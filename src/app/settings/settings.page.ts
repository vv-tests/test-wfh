import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private _cachesService: StorageService) {}
  public options: string[] = ['on', 'off'];
  ngOnInit() {
    const settings = localStorage.getItem('settings');
    if (!!settings) {
      this.patchForm(JSON.parse(settings));
    }
  }

  private patchForm({ notifications, emails }) {
    this.form.patchValue({
      notifications,
      emails,
    });
  }
  form: FormGroup = new FormGroup({
    notifications: new FormControl('off'),
    emails: new FormControl('off'),
  });

  submit(event, index = 2) {
    if (index == 0 && event.detail.checked == false) {
      this.form.get('emails').setValue('off');
    } else if (index == 0 && event.detail.checked == true) {
      this.form.get('emails').setValue('on');
    } else if (index == 1 && event.detail.checked == true) {
      this.form.get('emails').setValue('off');
    } else if (index == 1 && event.detail.checked == false) {
      this.form.get('emails').setValue('on');
    }
    // console.log(index, event.detail,this.form.value, event);
    localStorage.setItem('settings', JSON.stringify(this.form.value));
  }
}
