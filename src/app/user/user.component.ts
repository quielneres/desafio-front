import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {UserService} from "../services/user/user.service";
import {DialogService} from "primeng/dynamicdialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    DialogService,
    MessageService
  ]
})
export class UserComponent {
  name!: string;
  email!: string;
  password!: string;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
    ) {
  }

  submit(): void{
    const request = {
      name: this.name,
      email: this.email,
      password: this.password,
    }

    if (!request.name) {
      this.showMessage('Nome é obrigatorio');
    }

    if (!request.email) {
      this.showMessage('E-mail é obrigatorio');
    }

    if (!request.password) {
      this.showMessage('Senha é obrigatorio');
    }

    this.userService.sendUser(request).subscribe(response => {

      if (response.statusCode === 401) {
        this.showMessage('Erro na requisição');
        return;
      }

      localStorage.setItem('success-rest', 'Operação com sucesso!');
      // this.messageService.add({
      //   severity: 'success',
      //   detail: 'Operação realizada com sucesso!',
      //   life: 5000
      // });
      this.router.navigate(['login']);
    });
  }

  showMessage(message: string): void {
      this.messageService.add({
        severity: 'error',
        detail: message,
        life: 5000
      });
      return;
  }
}
