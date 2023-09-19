import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartProduct } from 'models/cart';
import { Products } from 'models/products';
import { User } from 'models/user';
import { CartService } from 'services/cart.service';
import { ProductService } from 'services/product.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:Cart=new Cart(0,0,0,[]);
  uId:number=0
  cId:number=0
  userId: number=0;
  products: any[]=[]
  total:number=0
  cartArr: Cart[] = [];
  userArr: User[]=[];
  //cartOne:CartProduct=new CartProduct(0,'',0,'',1)
  constructor(private router:Router,private cartService:CartService,private productService:ProductService, private userService:UserService ) {
    this.userService.getUsers().subscribe(data=>{
      this.userArr=data;
      // console.log(this.userArr)
 
    // localStorage.setItem('token','bhamsitha858@gmail.com')
      this.userArr.forEach(u=>{
        // console.log(u.uEmail)
        if(u.remailid==localStorage.getItem('token'))
        {
           this.userId=u._id;
           console.log(this.userId)
        }
      })
   
 
    })
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
          this.total=this.cart.total
        }
      });
      
     console.log(this.cId) 
   
    });
    
    
    
   }
   
  //  forfunc(){
     
  //  }
   
   deleteCartbyOne(pid:number){
     if(this.cart.products.length==1){
       this.deleteCart()
     }
    else{
    var num:number=0
    
    this.cart.products.forEach(c => {
      if(c._id == pid){
        num= c._id

      }
     console.log(num) 
    });
    for (let index = 0; index < this.cart.products.length; index++) {
      if(this.cart.products[index]._id==pid){
        num=index
      }
      
    }
    console.log(this.cart)
    console.log(num)
      this.cart.total=this.cart.total-this.cart.products[num].price*this.cart.products[num].count
 
        // let cp: CartProduct = new CartProduct(this.cartOne.id, this.cartOne.pName, this.cartOne.price, this.cartOne.img_path, 1)
        //delete this.cart.products[num]
        this.cart.products.splice(num,1)
        this.cartService.updateCart(this.cart).subscribe(data=>{
          
        })
        alert('Deleted the cart item')
        location.reload()
        location.reload()

        // this.cartService.deleteCartItem(this.cart.products[num].id,this.cart.id).subscribe(data=>{
      //   console.log(data)
      //   location.reload()
      // })
  } 
    
  }
  deleteCart(){
    alert('Your Checkout Completed')
    this.cartService.deleteCart(this.cart._id).subscribe(data=>{
      
      
    })
    location.reload()
    
  }
  ngOnInit(): void {
  }
  // deleteCartItem(pid:number){
  //   this.cartService.deleteCartItem(pid).subscribe(data=>{
  //     console.log(data)
  //     location.reload()
  //   })
  // }

}
