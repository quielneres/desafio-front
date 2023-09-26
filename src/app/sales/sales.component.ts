import {Component, OnInit} from '@angular/core';
import {PurchasingService} from "../services/purchasing/purchasing.service";
import {Purchasing} from "../services/purchasing/purchasing";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent   implements OnInit {
  purchasing:  Purchasing[] = [];
  constructor(
    private purchasingService: PurchasingService
  ) {
  }
  ngOnInit(): void {
    this.purchasingService.getAllPurchasings().subscribe(response => {
      this.purchasing = response.data;
    });
  }

}
