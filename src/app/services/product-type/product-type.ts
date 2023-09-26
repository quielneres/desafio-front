
export interface ProductTypeResponse {
  statusCode: number,
  data: ProductType[]
}
export interface ProductTypeGetResponse {
  statusCode: number,
  data: ProductType
}

export interface ProductTypeRequest {
  id?: number | null,
  description: string,
  taxPercentage: number
}

export interface ProductType {
  id: number,
  description: string,
  tax_percentage: number,
  created_at: string,
  updated_at: string
}
export interface SelectProductType {
  code: number,
  name: string
}
