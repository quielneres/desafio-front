import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../services/user/user.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  items: MenuItem[] | undefined;

  logged: boolean = false;


  constructor(private userService: UserService) { }
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-file',
        routerLink: ["/home"]
      },
      {
        label: 'Produtos',
        icon: 'pi pi-fw pi-file',
        routerLink: ["/product"]
      },
      {
        label: 'Tipo de produtos',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ["/product-types"]
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        routerLink: ["/users"],
        items: [
          {
            label: 'Novo usuario',
            icon: 'pi pi-plus',
            routerLink: ["/user/new"],
          }
        ]
      },
      {
        label: 'Vendas',
        icon: 'pi pi-fw pi-user',
        routerLink: ["/sales"]
      }
    ];

    if (this.userService.logged) {
      this.logged = true;
    }
  }

  logout(): void {
    this.userService.logout();
  }
}
