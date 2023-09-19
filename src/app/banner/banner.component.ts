import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'helper/missmatch';
import { User } from 'models/user';
import { UserService } from 'services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  display1 = '';
  display = '';
  rsubmitted = false;
  user: User = new User(0, '', '', '', '', '', '', 0, '', '', '', '', '', '');
  userArr: User[] = [];
  submitted = false;
  loginform = new FormGroup({
    emailid: new FormControl(''),
    password: new FormControl(''),
  });
  Registerform = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    remailid: new FormControl(''),
    rpassword: new FormControl(''),
    repassword: new FormControl(''),
    phonenumber: new FormControl(),
    address: new FormControl(''),
    addresstwo: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private lformBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.Registerform = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        dob: ['', Validators.required],
        gender: [''],
        remailid: ['', [Validators.required, Validators.email]],
        rpassword: ['', Validators.required],
        repassword: ['', Validators.required],
        phonenumber: ['', Validators.required],
        address: ['', Validators.required],
        addresstwo: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        role: ['user'],
      },
      {
        validators: MustMatch('rpassword', 'repassword'),
      }
    );
    this.loginform = this.lformBuilder.group({
      lemailid: ['', [Validators.required, Validators.email]],
      lpassword: ['', Validators.required],
    });
    this.userService.getUsers().subscribe((data) => {
      this.userArr = data;
    });
  }
  ngOnInit(): void {
    if (
      localStorage.getItem('role') == 'admin' ||
      localStorage.getItem('role') == 'Admin'
    ) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
    if (
      localStorage.getItem('role') == 'Admin' ||
      localStorage.getItem('role') == 'admin' ||
      localStorage.getItem('role') == 'user' ||
      localStorage.getItem('role') == 'User'
    ) {
      this.display1 = 'block';
    } else {
      this.display1 = 'none';
    }
  }
  get f() {
    return this.Registerform.controls;
  }
  get f1() {
    return this.loginform.controls;
  }
  onSubmit() {
    this.rsubmitted = true;
    Object.keys(this.Registerform.controls).forEach((key) => {
      console.log(key);
      if (this.Registerform.get(key)?.errors != null) {
        console.log(this.Registerform.get(key)?.errors);
      }
    });
    console.log(this.Registerform.invalid);

    if (this.Registerform.invalid) {
      return;
    }
    var tempId = 0;
    var maxId = 0;
    this.userArr.forEach((u) => {
      if (maxId < u._id) {
        maxId = u._id;
      }
    });
    console.log(maxId);
    tempId = maxId;
    tempId = tempId + 1;
    console.log('proceding');
    let fn = this.Registerform.value.firstname;
    let ln = this.Registerform.value.lastname;
    let d = this.Registerform.value.dob;
    let g = this.Registerform.value.gender;
    let rem = this.Registerform.value.remailid;
    let psw = this.Registerform.value.rpassword;
    let pno = this.Registerform.value.phonenumber;
    let add1 = this.Registerform.value.address;
    let add2 = this.Registerform.value.addresstwo;
    let c = this.Registerform.value.city;
    let co = this.Registerform.value.country;
    let s = this.Registerform.value.state;

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
      'user'
    );
    console.log(this.user);
    this.userService.addUser(this.user).subscribe((data) => {
      console.log(data);
    });
    alert('User added Succefully');
    location.reload();
  }

  onSubmitLogin() {
    console.log('inside');
    this.submitted = true;
    Object.keys(this.loginform.controls).forEach((key) => {
      console.log(key);
      if (this.Registerform.get(key)?.errors != null) {
        console.log(this.Registerform.get(key)?.errors);
      }
    });

    let email = this.loginform.value.lemailid;
    console.log(email);
    let passw = this.loginform.value.lpassword;
    console.log(passw);
    this.userArr.forEach((u) => {
      console.log(u.remailid);
      if (u.remailid == email && u.rpassword == passw) {
        localStorage.setItem('token', u.remailid);
        localStorage.setItem('role', u.role);
        console.log(localStorage.getItem('role'));
        alert('Welcome ' + u.firstname);
      }
    });
    if (
      localStorage.getItem('role') == 'admin' ||
      localStorage.getItem('role') == 'Admin'
    ) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
    //Logout
    if (
      localStorage.getItem('role') == 'Admin' ||
      localStorage.getItem('role') == 'admin' ||
      localStorage.getItem('role') == 'user' ||
      localStorage.getItem('role') == 'User'
    ) {
      this.display1 = 'block';
    } else {
      this.display1 = 'none';
    }
  }
  logout() {
    localStorage.setItem('token', 'null');
    localStorage.setItem('userid', '0');
    localStorage.setItem('role', 'null');
    this.router.navigate(['/home']);
    window.location.href = '/home';
  }
}
