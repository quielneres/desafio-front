
export interface ProductResponse {
  statusCode: number,
  data: Product[]
}

export interface ProductRequest {
  id_type: number,
  description: string,
  price: number
}

export interface Product {
  id?: number,
  id_type: number,
  description: string,
  price: number
}
