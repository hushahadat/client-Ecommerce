import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'models/products';
import { ProductService } from 'services/product.service';
@Component({
  selector: 'app-viewprod',
  templateUrl: './viewprod.component.html',
  styleUrls: ['./viewprod.component.scss'],
})
export class ViewprodComponent implements OnInit {
  str: string = 'Yes';
  status: string = 'Available';
  productArr: Products[] = [];
  constructor(private router: Router, private productService: ProductService) {
    this.productService.getProducts().subscribe((data) => {
      this.productArr = data;
    });
  }

  ngOnInit(): void {}
  displayProductDetails(_id: number) {
    console.log('Product Id:' + _id);
    this.router.navigate(['/product/' + _id]);
  }
  deleteProduct(pid: any) {
    this.productService.deleteProduct(pid).subscribe((data) => {
      console.log(data);
    });
    location.reload();
  }
  onFireEvent(msg: string) {
    this.status = 'Out of stock!!';
    console.log(`Received message from inner component:${msg}`);
  }
}
