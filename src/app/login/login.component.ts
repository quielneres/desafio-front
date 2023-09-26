import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api'; // Importe o serviço de mensagens do PrimeNG
import {UserService} from "../services/user/user.service";
import {IUser} from "../services/user/IUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService] // Forneça o serviço de mensagens aqui
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const mesagen = localStorage.getItem('success-rest');
    if (mesagen) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          detail: mesagen
        });
      });
      localStorage.removeItem('success-rest');
    }
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.formLogin.invalid) return;
    const user = this.formLogin.getRawValue() as IUser;
    this.userService.login(user).subscribe((response) => {
      if (response.statusCode == 401) {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha na autenticação',
          detail: response.message,
          life: 5000
        });
      }
    });
  }
}
