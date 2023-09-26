
export interface PurchasingList {
  purchasing: Purchasing
}

export interface Purchasing {
  id_product: number | undefined,
  id_type: number ,
  desc_product: string,
  desc_type: string,
  price_product: number,
  tax: number,
}
