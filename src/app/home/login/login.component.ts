import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/storage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm;
  public textButtonLogin = 'Login';
  public loading = false;

  constructor(
    public toastController: ToastController,
    private loginService: LoginService,
    private route: Router,
    private storage: StorageService) { }

  ngOnInit(): void {
    this.storage.clear();
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ionViewDidEnter() {
    this.resetLogin();
  }

  onSubmit(): void {
    this.storage.clear();
    this.textButtonLogin = 'Loading ...';
    this.loading = true;
    this.loginService.login(this.loginForm.controls.login.value, this.loginForm.controls.password.value).subscribe(data => {
      if (!data || !data.success) {
        this.loginError();
        this.resetLogin();
      } else {
        this.storage.set('name', data.data.name);
        this.storage.set('idUser', data.data.id);
        this.route.navigate(['/wellcome']);
      }
    }, error => {
      this.loginError();
      this.resetLogin();
    });
  }

  resetLogin() {
    this.storage.clear();
    this.loading = false;
    this.textButtonLogin = 'Login';
    this.loginForm.reset();
  }

  async loginError() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Login Failled',
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
