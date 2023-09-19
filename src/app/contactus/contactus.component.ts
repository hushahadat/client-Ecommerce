import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from 'models/contact';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  contact: Contact = new Contact('', '', '', '');
  contactArr: Contact[] = [];
  submitted = false;

  contactForm = new FormGroup({
    cName: new FormControl(''),
    cEmail: new FormControl(''),
    cPhone: new FormControl(''),
    cMessage: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      cName: ['', Validators.required],
      cEmail: ['', Validators.required],
      cPhone: ['', Validators.required],
      cMessage: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  get f() {
    return this.contactForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log('Completed Till here');

    Object.keys(this.contactForm.controls).forEach((key) => {
      console.log(key);
      if (this.contactForm.get(key)?.errors != null) {
        console.log(this.contactForm.get(key)?.errors);
      }
    });
    if (this.contactForm.invalid) {
      return;
    }
    var tempId = 0;
    var maxId = 0;
    let cn = this.contactForm.value.cName;
    let ce = this.contactForm.value.cEmail;
    let cp = this.contactForm.value.cPhone;
    let cm = this.contactForm.value.cMessage;
    this.contact = new Contact(cn, ce, cp, cm);
  }
}
