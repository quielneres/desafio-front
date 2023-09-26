import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../services/product/product";
import {ProductType, SelectProductType} from "../../services/product-type/product-type";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from "primeng/api";


class ProductTypelist {
}

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
  providers: [DialogService, MessageService]
})
export class FormProductComponent implements OnInit {


  selectedProductType!: SelectProductType | undefined;
  productTypeList: ProductTypelist[] | undefined;

  description!: string;
  price!: number;
  products: Product[] = [];
  id_product!: number;

  constructor(
    private productService: ProductService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.productTypeList = this.config.data.listTypes;
    this.description = this.config.data.product?.description;
    this.price = this.config.data.product?.price;
    this.id_product = this.config.data.product?.id;
  }

  send(): void {
    if (this.description == undefined) {
      this.showMessage('Field description required')
      return;
    }

    if (this.price == undefined) {
      this.showMessage('Field price required')
      return;
    }

    this.id_product ? this.update() : this.insert();
  }

  insert(): void {
    const request = {
      id_type: this.selectedProductType?.code,
      description: this.description,
      price: this.price
    }

    this.productService.sendProduct(request).subscribe(response => {
      localStorage.setItem('success-rest', 'Salvo com sucesso!');
      this.products = response.data;
      this.ref.close();
      window.location.reload();
    });
  }

  update(): void {
    const request = {
      id: this.id_product,
      id_type: this.selectedProductType?.code,
      description: this.description,
      price: this.price
    }
    this.productService.updateProduct(request).subscribe(response => {

      if (response.statusCode === 401) {
        this.messageService.add({
          severity: 'error',
          detail: 'login required',
          life: 5000
        });
        return;
      }

      localStorage.setItem('success-rest', 'Alterado com sucesso!');
      this.products = response.data;
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
