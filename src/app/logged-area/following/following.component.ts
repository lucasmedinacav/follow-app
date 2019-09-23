import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../home/user';
import { UserService } from '../user.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
})
export class FollowingComponent implements OnInit {

  constructor(private userService: UserService, private storage: StorageService) { }
  public users: User[];

  ngOnInit() {
    this.storage.get('idUser').then(val => {
      this.userService.getWhoUserFollows(val).subscribe(data => {
        this.users = data;
      });
    });
  }
}
