import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../user';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  public registerForm;
  public textButtonRegister = 'Register';
  public loading = false;

  constructor(public toastController: ToastController, private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.textButtonRegister = 'Loading ...';
    this.loading = true;
    const user = new User(
      this.registerForm.controls.name.value,
      this.registerForm.controls.login.value,
      this.registerForm.controls.password.value
    );
    this.registerService.register(user)
      .subscribe(data => {
        if (!data || !data.success) {
          this.loginError(data);
          this.resetResetRegister();
        } else {
          this.router.navigate(['/home/login']);
        }

      }, error => {
        this.loginError(error.error);
        this.resetResetRegister();
      });
  }

  resetResetRegister() {
    this.loading = false;
    this.textButtonRegister = 'Register';
    this.registerForm.reset();
  }

  async loginError(data) {
    let text = 'Register Failled';
    if (data && data.errors && data.errors[0] === 11000) {
      text = 'User already registered';
    }
    const toast = await this.toastController.create({
      color: 'danger',
      message: text,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
