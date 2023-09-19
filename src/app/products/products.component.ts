import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cart, CartProduct } from 'models/cart';
import { Products } from 'models/products';
import { User } from 'models/user';

import { CartService } from 'services/cart.service';
import { ProductService } from 'services/product.service';
import { UserService } from 'services/user.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  product_id: number = 0;
  product: Products = new Products(0, '', '', '', '', '', 0, 0, 0, '');
  parent_supp_id: string = '123';
  productArr: Products[] = [];
  cartArr: Cart[] = [];
  cart: Cart = new Cart(0, 0, 0, []);
  cId: number = 0;
  products: any[] = [];
  userArr: User[] = [];
  userId: number =0;
  cartProductsArr: Products[] = [];
  status: string = 'Available';
  constructor(
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userService.getUsers().subscribe((data) => {
      this.userArr = data;
      // console.log(this.userArr)

      this.userArr.forEach((u) => {
        // console.log(u.uEmail)
        if (u.remailid == localStorage.getItem('token')) {
          this.userId = u._id;
          console.log(this.userId);
          localStorage.setItem('uid',String(this.userId))
        }
      });
    });
    this.productService.getProducts().subscribe((data) => {
      this.productArr = data;
    });
    this.cartService.getAllCart().subscribe(data => {
      this.cartArr = data;
      
      console.log(this.cartArr)
      this.cartArr.forEach(element => {
        console.log(element._id)
        if(element.uId == this.userId){
          console.log(element.uId)
          this.cId = element._id
          console.log(this.cId)
          this.cart._id=element._id
          this.cart.products=element.products
          this.cart.total=element.total
          this.cart.uId=element.uId
          console.log(this.cart)
          this.products=this.cart.products
          
        }
      });
      
     console.log(this.cId) 
   
    });
    
    

    
  }
  refreshcart(){
    this.cartService.getAllCart().subscribe(data => {
      this.cartArr = data;
    });
  }

  ngOnInit(): void {}
  displayProductDetails(_id: number) {
    console.log('Product Id:' + _id);
    this.router.navigate(['/products/' + _id]);
  }
  deleteProduct(pid: any) {
    this.productService.deleteProduct(pid).subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }
  addToCart(pId: number) {
    //   for(var i=0;i<this.cartArr.length;i++){
    //     var c=this.cartArr[i]

    //   if(this.userId==c.uId)
    //   {
    //     // this.cartProduct=c
    //     this.cId=c.id
    //     console.log(this.cId)

    //   }
    // }
    console.log(this.userId)
   if (localStorage.getItem('token')!='null'){ 
console.log(pId)
    console.log(this.cart);
    var u_Id = this.userId;
    console.log(u_Id)
    this.productArr.forEach((p) => {
      if (p._id == pId) {
        console.log(p._id)
        this.product = p;
      }
    });

    let maxId: number = 0;
    let flag: boolean = false;
    console.log(this.cartArr);
    this.cartArr.forEach((element) => {
      console.log(element);
      if (element._id > maxId) {
        maxId = element._id;
      }

      element.total = element.total + this.product.price;

      if (element.uId == u_Id) {
        flag = true;
        let num: number = 0;
        for (let index = 0; index < this.cart.products.length; index++) {
          if (this.cart.products[index]._id == pId) {
            num = index;
          }
        }
        if (this.cart.products[num]._id == pId) {
          element.products[num].count += 1;
          this.cartService.updateCart(element).subscribe();
          alert('product addes to the cart');
          location.reload();
          return;
        } else {
          let cp: CartProduct = new CartProduct(
            this.product._id,
            this.product.pName,
            this.product.price,
            this.product.img_path,
            1
          );
          element.products.push(cp);
          this.cartService.updateCart(element).subscribe();
          alert('product addes to the cart');
          location.reload();
          return;
        }
      }

      if (!flag) {
        let cartProduct: CartProduct = new CartProduct(
          this.product._id,
          this.product.pName,
          this.product.price,
          this.product.img_path,
          1
        );
        let c: Cart = new Cart(maxId + 1, u_Id, this.product.price, [cartProduct]);
        this.cartService.addToCart(c).subscribe((data) => {
          console.log('new user cart created');
          alert('product addes to the cart');
          location.reload();
        });
       // this.refreshcart();
      }
    
    });
  }
  else{
    alert('User need to login!!')
  }
  
}
}
