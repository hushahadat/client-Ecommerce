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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  user: User = new User(0, '', '', '', '', '', '', 0, '', '', '', '', '', '');
  userArr: User[] = [];
  submitted = false;

  userForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    remailid: new FormControl(''),
    rpassword: new FormControl(''),
    phonenumber: new FormControl(''),
    address: new FormControl(''),
    addresstwo: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userService.getUsers().subscribe((data) => {
      this.userArr = data;
    });

    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      remailid: ['', Validators.required],
      rpassword: ['', Validators.required],
      phonenumber: ['', Validators.required],
      address: ['', Validators.required],
      addresstwo: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.userForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log('Completed Till here');

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
    var maxId = 0;
    this.userArr.forEach((u) => {
      if (maxId < u._id) {
        maxId = u._id;
      }
    });
    tempId = maxId;
    tempId = tempId + 1;

    let fn = this.userForm.value.firstname;
    let ln = this.userForm.value.lastname;
    let d = this.userForm.value.dob;
    let g = this.userForm.value.gender;
    let rem = this.userForm.value.remailid;
    let psw = this.userForm.value.rpassword;
    let pno = this.userForm.value.phonenumber;
    let add1 = this.userForm.value.address;
    let add2 = this.userForm.value.addresstwo;
    let c = this.userForm.value.city;
    let co = this.userForm.value.country;
    let s = this.userForm.value.state;
    let k = this.userForm.value.role;
    this.user = new User(
      tempId,
      fn,
      ln,
      d,
      g,
      rem,
      psw,
      pno,
      add1,
      add2,
      c,
      co,
      s,
      k
    );
    this.userService.addUser(this.user).subscribe((data) => {
      console.log(data);

      alert('User added successfully');
    });
  }
}
