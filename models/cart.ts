
export class Cart{
  _id:number
  uId:number
  products:CartProduct[]
  total:number
  
  constructor(i:number,uId:number,total:number,products:CartProduct[]){
      this._id=i
      this.uId=uId
      this.total=total
      this.products=products
  }
}
export class CartProduct{
  _id: number
  pName:string
  price:number
  img_path:string
  count:number
  constructor(id:number,pName:string,price:number,img_path:string,count:number){
      this._id=id
      this.pName=pName
      this.price=price
      this.img_path=img_path
      this.count=count
  }
}
