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
  selector: 'app-updatesupplier',
  templateUrl: './updatesupplier.component.html',
  styleUrls: ['./updatesupplier.component.scss'],
})
export class UpdatesupplierComponent implements OnInit {
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
  IdUpdated!: number;
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
  onChangeType(evt: any, evtvalue: any) {
    console.log(evt.target.value);
    var IdObtained = evt.target.value;
    this.IdUpdated = parseInt(IdObtained.split(':')[1].trim());
    for (var i = 0; i < this.supplierArray.length; i++) {
      if (this.IdUpdated == this.supplierArray[i]._id) {
        this.Supplier = this.supplierArray[i];
        console.log('bts');
      }
    }
    console.log(this.Supplier);
    console.log(this.supplierform.controls);

    this.supplierform.get('_id')?.setValue(this.Supplier._id);
    this.supplierform.get('suppliername')?.setValue(this.Supplier.sName);
    this.supplierform.get('phno')?.setValue(this.Supplier.sContact);
    this.supplierform.get('email')?.setValue(this.Supplier.sEmail);
    this.supplierform.get('location')?.setValue(this.Supplier.sLocation);
  }
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
    tempId = this.supplierform.value.supplierid;
    console.log(tempId);

    let sN = this.supplierform.value.suppliername;
    let spn = this.supplierform.value.phno;
    let sem = this.supplierform.value.email;
    let slo = this.supplierform.value.location;

    this.Supplier = new supplier(this.IdUpdated, sN, spn, sem, slo);
    this.supplierService.updatesupplier(this.Supplier).subscribe((data) => {
      this.Supplier = data;
      console.log(this.Supplier);
    });
    alert('Supplier Upadated Successfully...');
    location.reload();
  }
}
