import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supplier } from 'models/supplier';
import { SupplierService } from 'services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
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
  deletesupplier(supplier_id: number) {}
}
