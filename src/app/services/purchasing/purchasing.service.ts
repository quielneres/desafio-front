import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {PurchasingResponse} from "./purchasing";
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PurchasingService {

  constructor(private http: HttpClient) { }
  getAllPurchasings = (): Observable<PurchasingResponse> => {
    return  this.http.get<PurchasingResponse>(`${apiUrl}/sales`);
  }

  sendPurchasing = (request: {}): Observable<PurchasingResponse> => {
    return this.http.post<PurchasingResponse>(`${apiUrl}/checkout`, request);
  }
}
