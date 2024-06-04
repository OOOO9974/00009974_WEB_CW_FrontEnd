import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../models/Education'; // Import the Education DTO

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  educationList: Education[] = []; // Change the type to Education DTO array

  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      education: ['', Validators.required],
      company: '',
      birthDate: '',
      experience: '',
      salary: ''
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
    this.loadEducationList();
  }

  onFormSubmit() {
    if (this.empForm.valid) { 
      if (this.data) {
        if (this.empForm.value.education == null) {
          this._coreService.openSnackBar('Education required!');
          return;
        }

        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

  loadEducationList() {
    this.getEducationList().subscribe({
      next: (data: Education[]) => { // Specify the type of data
        this.educationList = data;
      },
      error: (err: any) => {
        console.error('Error fetching education list', err);
      }
    });
  }

  getEducationList(): Observable<Education[]> { // Specify the return type
    return this._http.get<Education[]>('https://localhost:7195/Education/education'); 
  }
}
