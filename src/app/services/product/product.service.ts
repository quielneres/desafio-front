import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from "rxjs";
import {Product, ProductRequest, ProductResponse} from "./product";
import {environment} from "../../../environment/environment";
import {ProductTypeRequest, ProductTypeResponse} from "../product-type/product-type";
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts = (): Observable<ProductResponse> => {
    return  this.http.get<ProductResponse>(`${apiUrl}/products`);
  }

  sendProduct = (request: {
    price: number;
    description: string;
    id_type: number | undefined
  }): Observable<ProductResponse> => {
    return this.http.post<ProductResponse>(`${apiUrl}/products`, request);
  }
  updateProduct = (request: {
    price: number;
    description: string;
    id_type: number | undefined;
    id: number
  }): Observable<ProductResponse> => {
    return this.http.post<ProductResponse>(`${apiUrl}/products/update`, request);
  }
}
