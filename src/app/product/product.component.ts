import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Products } from 'models/products';
import { ProductService } from 'services/product.service';
import { Router } from '@angular/router';
import { Cart, CartProduct } from 'models/cart';
import { User } from 'models/user';
import { CartService } from 'services/cart.service';
import { UserService } from 'services/user.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product_id: number = 0;
  product: Products = new Products(0, '', '', '', '', '', 0, 0, 0, '');
  parent_supp_id: string = '123';
  productArr: Products[] = [];
  cartArr: Cart[] = [];
  cart: Cart = new Cart(0, 0, 0, []);
  cId: number = 0;
  products: any[] = [];
  userArr: User[] = [];
  userId: number = 0;
  cartProductsArr: Products[] = [];
  status: string = 'Available';
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id_passed = params['pid'];
      console.log(id_passed);
      this.product_id = id_passed;
      this.productService.getProductById(this.product_id).subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
    });
  }
  deleteProduct(pid: number) {
    this.productService.deleteProduct(pid).subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }

  //   addToCart(pId: number) {
  //     //   for(var i=0;i<this.cartArr.length;i++){
  //     //     var c=this.cartArr[i]

  //     //   if(this.userId==c.uId)
  //     //   {
  //     //     // this.cartProduct=c
  //     //     this.cId=c.id
  //     //     console.log(this.cId)

  //     //   }
  //     // }
  // console.log(pId)
  //     console.log(this.cart);
  //     var u_Id = this.userId;
  //     this.productArr.forEach((p) => {
  //       if (p.id == pId) {
  //         this.product = p;
  //       }
  //     });

  //     let maxId: number = 0;
  //     let flag: boolean = false;
  //     console.log(this.cartArr);
  //     this.cartArr.forEach((element) => {
  //       console.log(element);
  //       if (element.id > maxId) {
  //         maxId = element.id;
  //       }

  //       element.total = element.total + this.product.price;

  //       if (element.uId == u_Id) {
  //         flag = true;
  //         let num: number = 0;
  //         for (let index = 0; index < this.cart.products.length; index++) {
  //           if (this.cart.products[index].id == pId) {
  //             num = index;
  //           }
  //         }
  //         if (this.cart.products[num].id == pId) {
  //           element.products[num].count += 1;
  //           this.cartService.updateCart(element).subscribe();
  //           alert('product addes to the cart');
  //           location.reload();
  //           return;
  //         } else {
  //           let cp: CartProduct = new CartProduct(
  //             this.product.id,
  //             this.product.pName,
  //             this.product.price,
  //             this.product.img_path,
  //             1
  //           );
  //           element.products.push(cp);
  //           this.cartService.updateCart(element).subscribe();
  //           alert('product addes to the cart');
  //           location.reload();
  //           return;
  //         }
  //       }

  //       if (!flag) {
  //         let cartProduct: CartProduct = new CartProduct(
  //           this.product.id,
  //           this.product.pName,
  //           this.product.price,
  //           this.product.img_path,
  //           1
  //         );
  //         let c: Cart = new Cart(maxId + 1, u_Id, this.product.price, [cartProduct]);
  //         this.cartService.addToCart(c).subscribe((data) => {
  //           console.log('new user cart created');
  //           alert('product addes to the cart');
  //           location.reload();
  //         });
  //         this.refreshcart();
  //       }
  //     });
  //   }
}
