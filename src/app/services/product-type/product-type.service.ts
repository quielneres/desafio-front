import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType, ProductTypeGetResponse, ProductTypeRequest, ProductTypeResponse} from "./product-type";
import {environment} from "../../../environment/environment";
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) {
  }

  getProductTypesId = (resquest: { id: number }): Observable<ProductTypeGetResponse> => {
    return  this.http.post<ProductTypeGetResponse>(`${apiUrl}/products-types/get`, resquest);
  }
  getProductTypes = (): Observable<ProductTypeResponse> => {
    return  this.http.get<ProductTypeResponse>(`${apiUrl}/products-types`);
  }
  sendProductType = (request: ProductTypeRequest): Observable<ProductTypeResponse> => {
    return this.http.post<ProductTypeResponse>(`${apiUrl}/products-types`, request);
  }
  updateProductType = (request: ProductTypeRequest): Observable<ProductTypeResponse> => {
    return this.http.post<ProductTypeResponse>(`${apiUrl}/products-types/update`, request);
  }
}
