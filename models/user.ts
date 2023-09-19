export class User {
  _id: number;
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  remailid: string;
  rpassword: string;
  phonenumber: number;
  address: string;
  addresstwo: string;
  city: string;
  country: string;
  state: string;
  role: string;

  constructor(
    i: number,
    fn: string,
    ln: string,
    d: string,
    g: string,
    rem: string,
    psw: string,
    pno: number,
    add1: string,
    add2: string,
    c: string,
    co: string,
    s: string,
    r: string
  ) {
    this._id = i;
    this.firstname = fn;
    this.lastname = ln;
    this.dob = d;
    this.gender = g;
    this.remailid = rem;
    this.rpassword = psw;
    this.phonenumber = pno;
    this.address = add1;
    this.addresstwo = add2;
    this.city = c;
    this.country = co;
    this.state = s;
    this.role = r;
  }
}
