
export interface PurchasingResponse {
  statusCode: number,
  data: Purchasing[]
}

export interface Purchasing {
  id: number,
  id_user: number,
  items: string,
  totalAmount: string,
  taxValue:string,
  itemsValue : string,
  created_at: string,
  updated_at: string
}
