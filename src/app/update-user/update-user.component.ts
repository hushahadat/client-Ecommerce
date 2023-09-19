import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'models/user';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  user: User = new User(0, '', '', '', '', '', '', 0, '', '', '', '', '', '');
  userArr: User[] = [];
  submitted = false;
  idUpdate!: number;
  userForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userService.getUsers().subscribe((data) => {
      this.userArr = data;
    });

    this.userForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl(''),
      remailid: new FormControl(''),
      rpassword: new FormControl(''),
      phonenumber: new FormControl('0'),
      address: new FormControl(''),
      addresstwo: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      role: new FormControl(''),
    });

    this.userForm = this.formBuilder.group({
      _id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      remailid: ['', Validators.required],
      rpassword: ['', Validators.required],
      phonenumber: ['0', Validators.required],
      address: ['', Validators.required],
      addresstwo: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  onChangeType(evt: any, evtvalue: any) {
    console.log(evt.target.value);
    var idObtained = evt.target.value;
    this.idUpdate = parseInt(idObtained.split(':')[1].trim());
    for (var i = 0; i < this.userArr.length; i++) {
      if (this.idUpdate == this.userArr[i]._id) {
        this.user = this.userArr[i];
      }
    }
    //console.log(this.user)
    console.log(this.userForm.controls);
    this.userForm.get('_id')?.setValue(this.user._id);
    this.userForm.get('firstname')?.setValue(this.user.firstname);
    this.userForm.get('lastname')?.setValue(this.user.lastname);
    this.userForm.get('dob')?.setValue(this.user.dob);
    this.userForm.get('gender')?.setValue(this.user.gender);
    this.userForm.get('remailid')?.setValue(this.user.remailid);
    this.userForm.get('rpassword')?.setValue(this.user.rpassword);
    this.userForm.get('phonenumber')?.setValue(this.user.phonenumber);
    this.userForm.get('address')?.setValue(this.user.address);
    this.userForm.get('addresstwo')?.setValue(this.user.addresstwo);
    this.userForm.get('city')?.setValue(this.user.city);
    this.userForm.get('country')?.setValue(this.user.country);
    this.userForm.get('state')?.setValue(this.user.state);
    this.userForm.get('role')?.setValue(this.user.role);
  }
  get f() {
    return this.userForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    Object.keys(this.userForm.controls).forEach((key) => {
      console.log(key);
      if (this.userForm.get(key)?.errors != null) {
        console.log(this.userForm.get(key)?.errors);
      }
    });
    if (this.userForm.invalid) {
      return;
    }
    var tempId = 0;
    tempId = this.userForm.value._id;
    console.log(tempId);
    let a = this.userForm.value.firstname;
    let b = this.userForm.value.lastname;
    let c = this.userForm.value.dob;
    let d = this.userForm.value.gender;
    let e = this.userForm.value.remailid;
    let f = this.userForm.value.rpassword;
    let g = this.userForm.value.phonenumber;
    let h = this.userForm.value.address;
    let i = this.userForm.value.addresstwo;
    let j = this.userForm.value.city;
    let k = this.userForm.value.country;
    let l = this.userForm.value.state;
    let m = this.userForm.value.role;
    this.user = new User(tempId, a, b, c, d, e, f, g, h, i, j, k, l, m);
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe((data) => {
      console.log(data);
    });

    alert('User updated successfully');
    location.reload();
  }
}
