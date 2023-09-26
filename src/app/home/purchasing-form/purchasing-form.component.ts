import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Product} from "../../services/product/product";
import {ProductType} from "../../services/product-type/product-type";
import {Purchasing, PurchasingList} from "../purchasing";
import {PurchasingService} from "../../services/purchasing/purchasing.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-purchasing-form',
  templateUrl: './purchasing-form.component.html',
  styleUrls: ['./purchasing-form.component.css'],
  providers: [DialogService, MessageService]
})
export class PurchasingFormComponent implements OnInit{
  fullname!: string;
  email!: string;
  totalAmount!: number;
  taxValue!: number;
  itemsValue!: number;
  purchasingList: Purchasing[] = [];

  constructor(
    private purchasingService: PurchasingService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
  }
  ngOnInit(): void {
    this.purchasingList = this.config.data as Purchasing[];
    this.itemsValue = 0;
    this.taxValue = 0;
    this.totalAmount = 0;

    this.purchasingList.forEach(item => {
      const price = parseFloat(item.price_product.toString());
      const quantity = this.purchasingList.length;
      const taxRate = item.tax;

      if (!isNaN(price) && !isNaN(taxRate)) {
        const itemTotal = price * quantity;
        const itemTax = (price * quantity * taxRate) / 100;

        this.itemsValue += itemTotal;
        this.taxValue += itemTax;
        this.totalAmount = this.itemsValue + this.taxValue;
      }
    });
  }

  submit(): void {


    if (this.fullname == undefined) {
      this.showMessage('Field fullname required')
      return;
    }

    if (this.email == undefined) {
      this.showMessage('Field email required')
      return;
    }

    const request = {
      items: this.purchasingList,
      name: this.fullname,
      email: this.email,
      totalAmount: this.totalAmount,
      taxValue: this.totalAmount,
      itemsValue: this.itemsValue,

    }

    this.purchasingService.sendPurchasing(request).subscribe(response => {
      response.statusCode
      if (response.statusCode == 401) {
        this.showMessage('Erro na requisição')
      }

      this.fullname = '';
      this.email = '';
      this.totalAmount = 0;
      this.taxValue = 0;
      this.itemsValue = 0;
      this.purchasingList = [];
      localStorage.setItem('success-rest', 'Operação realizado com sucesso');
      this.ref.close();

      window.location.reload();
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



