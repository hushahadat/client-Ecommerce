export class supplier {
  _id: number;
  sName: string;
  sContact: number;
  sEmail: string;
  sLocation: string;

  id: any;

  constructor(i: number, sN: string, spn: number, sem: string, slo: string) {
    this._id = i;
    this.sName = sN;
    this.sContact = spn;
    this.sEmail = sem;
    this.sLocation = slo;
  }
}
