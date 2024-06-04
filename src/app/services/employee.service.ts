import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post('https://localhost:7195/Employee/employees', data); 
  }
  
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`https://localhost:7195/Employee/employees/${id}`, data); 
  }
  

  getEmployeeList(): Observable<any> {
    return this._http.get('https://localhost:7195/Employee/employees'); 
  }


  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7195/Employee/employees/${id}`);
  }
}
