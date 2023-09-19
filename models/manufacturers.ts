export class Manufacturers {
  /*   addmanufacturers(): Manufacturers[] {
    throw new Error('Method not implemented.');
  }
  addmanufacturer(manufacturers: Manufacturers) {
    throw new Error('Method not implemented.');
  } */
  _id: number;
  mName: string;
  mPhoneNo: string;
  mLocation: string;
  PointOfContact: string;
  mEmail: string;

  constructor(
    _id: number,
    mN: string,
    mP: string,
    mL: string,
    mPOC: string,
    mE: string
  ) {
    this._id = _id;
    this.mName = mN;
    this.mPhoneNo = mP;
    this.mLocation = mL;
    this.PointOfContact = mPOC;
    this.mEmail = mE;
  }
}
