import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {ProductService} from "../../services/product/product.service";
import {ProductTypeService} from "../../services/product-type/product-type.service";
import {Product} from "../../services/product/product";
import {ProductType} from "../../services/product-type/product-type";

@Component({
  selector: 'app-form-product-type',
  templateUrl: './form-product-type.component.html',
  styleUrls: ['./form-product-type.component.css'],
  providers: [DialogService, MessageService]
})
export class FormProductTypeComponent implements OnInit {

  id_product_type!: number;
  description!: string;
  tax_percentage!: number;
  productTypes: ProductType[] = [];

  constructor(
    private productTypeService: ProductTypeService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.description = this.config.data?.description;
    this.tax_percentage = this.config.data?.tax_percentage;
    this.id_product_type = this.config.data?.id;
  }

  submit(): void {
    if (this.description == undefined) {
      this.showMessage('Field description required');
      return;
    }

    if (this.tax_percentage == undefined) {
      this.showMessage('Field tax_percentage required');
      return;
    }

    this.id_product_type ? this.update() : this.insert();
  }

  insert(): void {
    const request = {
      description: this.description,
      taxPercentage: this.tax_percentage
    }

    this.productTypeService.sendProductType(request).subscribe(response => {
      localStorage.setItem('success-rest', 'Salvo com sucesso!');
      this.productTypes = response.data;
      this.ref.close();
      window.location.reload();
    });
  }

  update(): void {
    const request = {
      id: this.id_product_type,
      description: this.description,
      taxPercentage: this.tax_percentage
    }
    this.productTypeService.updateProductType(request).subscribe(response => {

      if (response.statusCode === 401) {
        this.messageService.add({
          severity: 'error',
          detail: 'login required',
          life: 5000
        });
        return;
      }

      localStorage.setItem('success-rest', 'Alterado com sucesso!');
      this.productTypes = response.data;
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
