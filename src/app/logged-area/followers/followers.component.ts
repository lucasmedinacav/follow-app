import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../home/user';
import { UserService } from '../user.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
})
export class FollowersComponent implements OnInit {

  constructor(private userService: UserService, private storage: StorageService) { }
  public users: User[];

  ngOnInit() {
    this.storage.get('idUser').then(val => {
      this.userService.getAllFollowers(val).subscribe(data => {
        this.userService.getWhoUserFollows(val).subscribe(followed => {
          data.forEach(user => {
            user.followed = followed.some(item => item.idUser === user.idUser);
          });
          this.users = data;
        });
      });
    });
  }
}
