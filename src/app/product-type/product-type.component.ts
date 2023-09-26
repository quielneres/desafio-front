import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../services/product/product";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ProductType} from "../services/product-type/product-type";
import {ProductService} from "../services/product/product.service";
import {MessageService} from "primeng/api";
import {ProductTypeService} from "../services/product-type/product-type.service";
import {FormProductTypeComponent} from "./form-product-type/form-product-type.component";


class ProductTypelist {
}

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css'],
  providers: [DialogService, MessageService]

})
export class ProductTypeComponent implements OnInit, OnDestroy {
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

  show(value?: ProductType) {

    let modalTitle = 'Cadastrar Tipo Produto';

    console.log('value', value);

    if (value) {
      modalTitle = 'Editar Tipo Produto';
    }

    this.ref = this.dialogService.open(FormProductTypeComponent, {
      header: modalTitle,
      width: '70%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      maximizable: true,
      data: value
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.messageService.add({severity: 'info', summary: 'Product Selected', detail: 'sdfsdfs'});
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}`});
    });
  }

  update(product: ProductType): void {
    this.show(product);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
