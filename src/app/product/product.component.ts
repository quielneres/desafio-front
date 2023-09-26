import { Component, OnInit, OnDestroy} from '@angular/core';
import {ProductService} from "../services/product/product.service";
import {Product} from "../services/product/product";
import { MessageService } from 'primeng/api';

import {FormProductComponent} from "./form-product/form-product.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {ProductTypeService} from "../services/product-type/product-type.service";
import {ProductType} from "../services/product-type/product-type";

class ProductTypelist {
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [DialogService, MessageService]
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  ref: DynamicDialogRef | undefined;
  productTypeList: ProductTypelist[] | undefined;
  productType: ProductType[] = [];

  constructor(
    private productService: ProductService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private productTypeService: ProductTypeService
  ) {
  }

  ngOnInit(): void {
    this.productTypeService.getProductTypes().subscribe(
      types => {
        this.productType = types.data
      }
    )
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
    });
    this.showMessage();
  }

  showMessage(): void {
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
  }

  show(value?: Product) {

    if (this.productType.length == 0) {
      this.messageService.add({
        severity: 'warn',
        detail: "Primeiro é preciso cadastrar pelo menos um tipo de produto!"
      });
      return;
    }

    const listTypes: any = [];

    this.productType.forEach(type => {
      listTypes.push({name: type.description, code: type.id})
    });

    let modalTitle = 'Cadastrar Produto';
    let selectType = {};

    if (value) {
      modalTitle = 'Editar Produto';

      this.productType.forEach(type => {
        //logica para peegar typo atrelado ao produto
      })
    }

    this.ref = this.dialogService.open(FormProductComponent, {
      header: modalTitle,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        'product': value,
        'listTypes': listTypes,
        'selectType': selectType
      },
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: 'sdfsdfs' });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
  update(product: Product): void {
    this.show(product);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
