import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product/product.service";
import {Product} from "../services/product/product";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {PurchasingFormComponent} from "./purchasing-form/purchasing-form.component";
import {ProductTypeService} from "../services/product-type/product-type.service";
import {ProductType} from "../services/product-type/product-type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService, MessageService]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  ref: DynamicDialogRef | undefined;
  isData: boolean = true;
  responsiveOptions: any[] | undefined;
  purchasingItems: any[] = []; // Defina a tipagem explícita como um array vazio
  itemsQtd: number = 0;
  productType: ProductType = {
    id: 0,
    description: '',
    tax_percentage: 0,
    created_at: '',
    updated_at: ''
  };

  constructor(
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    public dialogService: DialogService,
    public messageService: MessageService,
  ) {
    // Não é necessário inicializar this.purchasingItems aqui, pois já fizemos isso na declaração.
  }

  ngOnInit() {
    this.itemsQtd = 0;

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

    this.productService.getProducts().subscribe((products) => {
      console.log('products.data', products.data);
      if (products.data.length == 0) {
        this.isData = false;
      }

      this.products = products.data;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  addCart(product: Product): void {

    const request = {
      id: product.id_type
    }

    this.productTypeService.getProductTypesId(request).subscribe(
      types => {
        this.productType = types.data;
          const desc_type: string = this.productType.description;
          const tax: number = this.productType.tax_percentage;

          const purchasing = {
            id_product: product.id,
            id_type: product.id_type,
            desc_product: product.description,
            desc_type: desc_type,
            price_product:  product.price,
            tax: tax,
          };

          this.purchasingItems.push(purchasing);
          this.itemsQtd += 1;

      }
    );
  }

  sendPurchase() {
    this.ref = this.dialogService.open(PurchasingFormComponent, {
      header: 'Carrinho',
      width: '70%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      maximizable: true,
      data: this.purchasingItems
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

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return null;
  }
}
