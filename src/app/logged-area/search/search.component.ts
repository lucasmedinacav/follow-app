import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../home/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  public nameLogged = '';
  public idLoggedUser = '';
  public users: User[];
  public nameSearched = '';

  constructor(
    private userService: UserService,
    private storage: StorageService,
    private router: Router) {
  }

  ionViewWillEnter() {
    this.users = [];
    this.nameSearched = '';
    this.storage.get('name').then(val => { this.nameLogged = val.split(' ')[0]; });
    this.storage.get('idUser').then(val => { this.idLoggedUser = val; });
  }

  search(event) {
    if (event.target.value) {
      this.userService.search(event.target.value.toLowerCase(), this.idLoggedUser).subscribe(data => {
        this.users = data;
      });
    } else {
      this.users = [];
    }
  }

  backLogin() {
    this.storage.clear();
    this.users = [];
    this.nameSearched = '';
    this.router.navigate(['/home/login']);
  }
}
