import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/home/user';
import { StorageService } from 'src/app/storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {

  name: string = '';
  user: User;
  show: string = 'main';
  users: User[];

  constructor(private storage: StorageService, private userService: UserService,
    private toastController: ToastController, private router: Router) { }

  ionViewWillEnter() {
    this.storage.get('user').then(val => {
      this.user = val;
      this.name = val.name;
    });
  }

  getFollowers() {
    const idUser = this.user.idUser ? this.user.idUser : this.user._id;
    this.userService.getAllFollowers(idUser).subscribe(data => {
      if (data) {
        this.show = 'users';
        this.users = data;
      } else {
        this.showrror();
      }
    }, error => {
      this.showrror();
    });
  }

  getFollowing() {
    const idUser = this.user.idUser ? this.user.idUser : this.user._id;
    this.userService.getWhoUserFollows(idUser).subscribe(data => {
      if (data) {
        this.show = 'users';
        this.users = data;
      } else {
        this.showrror();
      }
    }, error => {
      this.showrror();
    });
  }

  back() {
    if (this.show === 'main') {
      this.router.navigate(['/wellcome']);
    } else {
      this.show = 'main';
      this.router.navigate(['/wellcome/user-profile']);
    }
  }

  async showrror() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'No results',
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
