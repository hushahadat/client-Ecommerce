import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supplier } from 'models/supplier';
import { SupplierService } from 'services/supplier.service';

@Component({
  selector: 'app-viewsupplier',
  templateUrl: './viewsupplier.component.html',
  styleUrls: ['./viewsupplier.component.scss'],
})
export class ViewsupplierComponent implements OnInit {
  supplierArray: supplier[] = [];
  constructor(
    private router: Router,
    private supplierService: SupplierService
  ) {
    this.supplierService.getsupplier().subscribe((data: supplier[]) => {
      this.supplierArray = data;
    });
  }
  ngOnInit(): void {}
  displaysupplierdetails(sid: number) {
    console.log('Supplier Id:' + sid);
    this.router.navigate(['/singlesupplier/' + sid]);
  }
  // deletesupplier(id:number){
  //   const res=this.supplierArray.filter(obj=>obj.id !==id);
  //   console.log(res)
  //   alert("Supplier Deleted Successfully!!..")
  //   return res;
  // }

  deletesupplier(sp: supplier) {
    this.supplierService.deletesupplier(sp).subscribe((data) => {
      console.log(data);
    });
    alert('Supplier deleted Successfully!!..');
    location.reload();
  }
}
