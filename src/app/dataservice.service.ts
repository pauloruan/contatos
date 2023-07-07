import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  apiUrl = 'http://localhost:3000/contacts';
  constructor(private _http: HttpClient) {}

  getData() {
    return this._http.get(this.apiUrl);
  }

  postData(data: any) {
    return this._http.post(this.apiUrl, data);
  }

  updateData(id: number, contact: any) {
    return this._http.put(`${this.apiUrl}/${id}`, contact);
  }

  deleteData(id: number, contact: any) {
    return this._http.delete(`${this.apiUrl}/${id}`, contact);
  }
}
