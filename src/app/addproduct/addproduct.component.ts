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
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  product: Products = new Products(0, '', '', '', '', '', 0, 0, 0, '');
  productArr: Products[] = [];
  submitted = false;

  productForm = new FormGroup({
    _id: new FormControl(''),
    pName: new FormControl(''),
    pStyle: new FormControl(''),
    pBattery: new FormControl(''),
    pFittingRange: new FormControl(''),
    pRemarks: new FormControl(''),
    price: new FormControl(''),
    supplier_id: new FormControl(''),
    manufacturer_id: new FormControl(''),
    img_path: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.productService.getProducts().subscribe((data) => {
      this.productArr = data;
    });
    this.productForm = this.formBuilder.group({
      id: [0, Validators.required],
      pName: ['', Validators.required],
      pStyle: ['', Validators.required],
      pBattery: ['', Validators.required],
      pFittingRange: ['', Validators.required],
      pRemarks: ['', Validators.required],
      price: [0, Validators.required],
      supplier_id: [0, Validators.required],
      manufacturer_id: [0, Validators.required],
      img_path: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.productForm.controls).forEach((key) => {
      if (this.productForm.get(key)?.errors != null) {
        console.log(this.productForm.get(key)?.errors);
      }
    });
    if (this.productForm.invalid) {
      return;
    }
    var tempId = 0;
    var maxId = 0;
    this.productArr.forEach((p) => {
      if (maxId < p._id) {
        maxId = p._id;
      }
    });
    tempId = maxId;
    tempId = tempId + 1;
    console.log(tempId);
    let pN = this.productForm.value.pName;
    let pS = this.productForm.value.pStyle;
    let pF = this.productForm.value.pFittingRange;
    let pB = this.productForm.value.pBattery;
    let pR = this.productForm.value.pRemarks;
    let pr = this.productForm.value.price;
    let pSupId = this.productForm.value.supplier_id;
    let pManuId = this.productForm.value.manufacturer_id;
    let pImgpath = this.productForm.value.img_path;
    this.product = new Products(
      tempId,
      pN,
      pS,
      pF,
      pB,
      pR,
      pr,
      pSupId,
      pManuId,
      pImgpath
    );
    this.productService.addProduct(this.product).subscribe((data) => {
      console.log(data);
    });
    alert('Product added successfully!');
    location.reload();
  }
}
