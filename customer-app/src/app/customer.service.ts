import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7053/api/customers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addCustomer(customer: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, customer, { headers });
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, customer, { headers });
  }

  getCustomerById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  getAllCustomers(): Observable<any[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any[]>(this.apiUrl, { headers });
}
deleteCustomer(id: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.delete(`${this.apiUrl}/${id}`, { headers });
}

}
