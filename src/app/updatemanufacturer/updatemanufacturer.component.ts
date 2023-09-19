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
  selector: 'app-updatemanufacturer',
  templateUrl: './updatemanufacturer.component.html',
  styleUrls: ['./updatemanufacturer.component.scss'],
})
export class UpdatemanufacturerComponent implements OnInit {
  manufacturers: Manufacturers = new Manufacturers(0, '', '', '', '', '');
  manufacturerArr: Manufacturers[] = [];
  submitted = false;

  manufacturerform = new FormGroup({
    mName: new FormControl(''),
    mPhoneNo: new FormControl(''),
    mLocation: new FormControl(''),
    PointOfContact: new FormControl(''),
    mEmail: new FormControl(''),
  });
  idUpdated: number;

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
    this.idUpdated = 0;
  }

  ngOnInit(): void {}

  onChangeType(evt: any, evtvalue: any) {
    console.log(evt.target.value);
    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    for (var i = 0; i < this.manufacturerArr.length; i++) {
      if (this.idUpdated == this.manufacturerArr[i]._id) {
        this.manufacturers = this.manufacturerArr[i];
      }
    }

    this.manufacturerform.get('mName')?.setValue(this.manufacturers.mName);
    this.manufacturerform
      .get('mPhoneNo')
      ?.setValue(this.manufacturers.mPhoneNo);
    this.manufacturerform
      .get('mLocation')
      ?.setValue(this.manufacturers.mLocation);
    this.manufacturerform
      .get('PointOfContact')
      ?.setValue(this.manufacturers.PointOfContact);
    this.manufacturerform.get('mEmail')?.setValue(this.manufacturers.mEmail);
  }
  get f() {
    return this.manufacturerform.controls;
  }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.manufacturerform.controls).forEach((key) => {
      if (this.manufacturerform.get(key)?.errors != null) {
        console.log(this.manufacturerform.get(key)?.errors);
      }
    });

    if (this.manufacturerform.invalid) {
      return;
    }
    var tempId = 0;

    tempId = this.idUpdated;

    console.log(tempId);
    let mN = this.manufacturerform.value.mName;
    let mp = this.manufacturerform.value.mPhoneNo;
    let ml = this.manufacturerform.value.mLocation;
    let mpoc = this.manufacturerform.value.PointOfContact;
    let me = this.manufacturerform.value.mEmail;
    this.manufacturers = new Manufacturers(tempId, mN, mp, ml, mpoc, me);

    console.log(this.manufacturers);
    this.ManufacturersService.updateManufacturer(this.manufacturers).subscribe(
      (data) => {
        console.log(data);
      }
    );
    alert('succesful updated' + tempId);
    location.reload();
  }
}
