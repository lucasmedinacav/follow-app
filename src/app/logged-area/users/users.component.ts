import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/home/user';
import { StorageService } from 'src/app/storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  @Input() users: User[];
  @Input() hideAction: boolean = false;

  constructor(
    private storage: StorageService,
    private userService: UserService,
    private toastController: ToastController,
    private router: Router) { }

  follow(user) {
    const idUser = user.idUser ? user.idUser : user._id;
    this.storage.get('idUser').then(val => {
      this.userService.follow(val, idUser.toString()).subscribe(data => {
        if (data.success) {
          this.users.forEach(item => {
            if (item._id === idUser || item.idUser === idUser) {
              item.followed = true;
            }
          });
        } else {
          this.showError('Error on follow user');
        }
      });
    });
  }

  unfollow(user) {
    const idUser = user.idUser ? user.idUser : user._id;
    this.storage.get('idUser').then(val => {
      this.userService.unfollow(val, idUser.toString()).subscribe(data => {
        if (data.success) {
          this.users.forEach(item => {
            if (item._id === idUser || item.idUser === idUser) {
              item.followed = false;
            }
          });
        } else {
          this.showError('Error on unfollow user');
        }
      });
    });
  }

  async showError(text) {
    const toast = await this.toastController.create({
      color: 'danger',
      message: text,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  goToUser(user) {
    this.storage.set('user', user);
    this.router.navigate(['/wellcome/user-profile']);
  }
}
