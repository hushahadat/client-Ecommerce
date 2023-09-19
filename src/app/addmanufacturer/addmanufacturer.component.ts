import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Manufacturers } from 'models/manufacturers';
import { ManufacturersService } from 'services/manufacturers.service';

@Component({
  selector: 'app-addmanufacturer',
  templateUrl: './addmanufacturer.component.html',
  styleUrls: ['./addmanufacturer.component.scss'],
})
export class AddmanufacturerComponent implements OnInit {
  manufacturers: Manufacturers = new Manufacturers(0, '', '', '', '', '');
  manufacturerArr: Manufacturers[] = [];
  submitted = false;

  manufacturerform = new FormGroup({
    /*  mId: new FormControl(0), */
    mName: new FormControl(''),
    mPhoneNo: new FormControl(''),
    mLocation: new FormControl(''),
    PointOfContact: new FormControl(''),
    mEmail: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private ManufacturersService: ManufacturersService
  ) {
    this.ManufacturersService.getmanufacturer().subscribe((data) => {
      this.manufacturerArr = data;
    });
    this.manufacturerform = this.formBuilder.group({
      /*  mId: [0, Validators.required], */
      mName: ['', Validators.required],
      mPhoneNo: ['', Validators.required],
      mLocation: ['', Validators.required],
      PointOfContact: ['', Validators.required],
      mEmail: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.manufacturerform.controls;
  }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.manufacturerform.controls).forEach((key) => {
      console.log(key);
      if (this.manufacturerform.get(key)?.errors != null) {
        console.log(this.manufacturerform.get(key)?.errors);
      }
    });
    if (this.manufacturerform.invalid) {
      return;
    }
    var tempId = 0;
    var maxId = 0;
    this.manufacturerArr.forEach((p) => {
      if (maxId < p._id) {
        maxId = p._id;
      }
    });
    tempId = maxId;
    tempId = tempId + 1;
    console.log(tempId);
    let mpn = this.manufacturerform.value.mName;
    let mp = this.manufacturerform.value.mPhoneNo;
    let ml = this.manufacturerform.value.mLocation;
    let mpoc = this.manufacturerform.value.PointOfContact;
    let me = this.manufacturerform.value.mEmail;
    this.manufacturers = new Manufacturers(tempId, mpn, mp, ml, mpoc, me);

    var tempArr = this.ManufacturersService.addmanufacturers(
      this.manufacturers
    ).subscribe((data) => {
      console.log(data);
    });
    alert('Successful with id' + tempId);
    location.reload();
  }
}
