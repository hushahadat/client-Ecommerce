export class Products {
  _id: number;
  pName: string;
  pStyle: string;
  pBattery: string;
  pFittingRange: string;
  pRemarks: string;
  price: number;
  supplier_id: number;
  manufacturer_id: number;
  img_path: string;

  constructor(
    i: number,
    pN: string,
    pS: string,
    pB: string,
    pFR: string,
    pR: string,
    pr: number,
    sup_id: number,
    manu_id: number,
    im_p: string
  ) {
    this._id = i;
    this.pName = pN;
    this.pStyle = pS;
    this.pBattery = pB;
    this.pFittingRange = pFR;
    this.pRemarks = pR;
    this.price = pr;
    this.supplier_id = sup_id;
    this.manufacturer_id = manu_id;
    this.img_path = im_p;
  }
}
