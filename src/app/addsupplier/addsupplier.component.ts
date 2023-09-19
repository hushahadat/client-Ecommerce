import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { supplier } from 'models/supplier';
import { SupplierService } from 'services/supplier.service';

@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.scss'],
})
export class AddsupplierComponent implements OnInit {
  Supplier: supplier = new supplier(0, '', 0, '', '');
  supplierArray: supplier[] = [];
  submitted = false;
  supplierform = new FormGroup({
    _id: new FormControl('0'),
    sName: new FormControl(''),
    sContact: new FormControl('0'),
    sEmail: new FormControl(''),
    sLocation: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService
  ) {
    this.supplierService.getsupplier().subscribe((data: supplier[]) => {
      this.supplierArray = data;
    });
    this.supplierform = this.formBuilder.group({
      supplierid: ['', Validators.required],
      suppliername: ['', Validators.required],
      phno: ['', Validators.required],
      email: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  get f() {
    return this.supplierform.controls;
  }
  onSubmit() {
    this.submitted = true;
    Object.keys(this.supplierform.controls).forEach((key) => {
      console.log(key);
      if (this.supplierform.get(key)?.errors != null) {
        console.log(this.supplierform.get(key)?.errors);
      }
    });

    if (this.supplierform.invalid) {
      return;
    }
    var tempId = 0;
    var maxId = 0;
    this.supplierArray.forEach((s) => {
      if (maxId < s._id) {
        maxId = s._id;
      }
    });
    tempId = maxId;
    tempId = tempId + 1;
    console.log(tempId);
    //let i = this.supplierform.value.supplierid;
    let sN = this.supplierform.value.suppliername;
    let spn = this.supplierform.value.phno;
    let sem = this.supplierform.value.email;
    let slo = this.supplierform.value.location;

    this.Supplier = new supplier(tempId, sN, spn, sem, slo);

    this.supplierService.addsupplier(this.Supplier).subscribe((data) => {
      console.log(data);
    });
    alert('Supplier added Successfully...');
    location.reload();
  }
}
