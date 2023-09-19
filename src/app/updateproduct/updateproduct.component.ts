import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Products } from 'models/products';
import { ProductService } from 'services/product.service';
@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss'],
})
export class UpdateproductComponent implements OnInit {
  products: Products = new Products(0, '', '', '', '', '', 0.0, 0, 0, '');
  productArr: Products[] = [];
  submitted = false;

  productForm = new FormGroup({
    _id: new FormControl(''),
    pName: new FormControl(''),
    pStyle: new FormControl(''),
    pBattery: new FormControl(''),
    pFittingRange: new FormControl(''),
    pRemarks: new FormControl(''),
    price: new FormControl(0.0),
    supplier_id: new FormControl(0),
    manufacturer_id: new FormControl(0),
    img_path: new FormControl(''),
  });
  idUpdated: number;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.productService.getProducts().subscribe((data) => {
      this.productArr = data;
    });
    this.productForm = this.formBuilder.group({
      _id: ['', Validators.required],
      pName: ['', Validators.required],
      pStyle: ['', Validators.required],
      pBattery: ['', Validators.required],
      pFittingRange: ['', Validators.required],
      pRemarks: ['', Validators.required],
      price: [0.0, Validators.required],
      supplier_id: [0, Validators.required],
      manufacturer_id: [0, Validators.required],
      img_path: ['', Validators.required],
    });
    this.idUpdated = 0;
  }
  ngOnInit(): void {}

  onChangeType(evt: any, evtvalue: any) {
    console.log(evt.target.value);
    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    for (var i = 0; i < this.productArr.length; i++) {
      if (this.idUpdated == this.productArr[i]._id) {
        this.products = this.productArr[i];
      }
    }

    console.log(this.productForm.get('id'));
    this.productForm.get('id')?.setValue(this.products._id);
    this.productForm.get('pName')?.setValue(this.products.pName);
    this.productForm.get('pStyle')?.setValue(this.products.pStyle);
    this.productForm.get('pBattery')?.setValue(this.products.pBattery);
    this.productForm
      .get('pFittingRange')
      ?.setValue(this.products.pFittingRange);
    this.productForm.get('pRemarks')?.setValue(this.products.pRemarks);
    this.productForm.get('price')?.setValue(this.products.price);
    this.productForm.get('supplier_id')?.setValue(this.products.supplier_id);
    this.productForm
      .get('manufacturer_id')
      ?.setValue(this.products.manufacturer_id);
    this.productForm.get('img_path')?.setValue(this.products.img_path);
  }
  get f() {
    return this.productForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    Object.keys(this.productForm.controls).forEach((key) => {
      console.log(key);
      if (this.productForm.get(key)?.errors != null) {
        console.log(this.productForm.get(key)?.errors);
      }
    });
    if (this.productForm.invalid) {
      return;
    }
    var tempId = 0;
    tempId = this.productForm.value.id;
    console.log(tempId);
    let pN = this.productForm.value.pName;
    let pS = this.productForm.value.pStyle;
    let pF = this.productForm.value.pFittingRange;
    let pB = this.productForm.value.pBattery;
    let pR = this.productForm.value.pRemarks;
    let pr = this.productForm.value.price;
    let supp_id = this.productForm.value.supplier_id;
    let manu_id = this.productForm.value.manufacturer_id;
    let im_p = this.productForm.value.img_path;
    this.products = new Products(
      tempId,
      pN,
      pS,
      pB,
      pF,
      pR,
      pr,
      supp_id,
      manu_id,
      im_p
    );
    this.productService.updateProduct(this.products).subscribe((data) => {
      console.log(data);
    });
    alert('Product updated successfully');
    location.reload();
  }
}
