import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { ConditionComponent } from './condition/condition.component';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGaurd } from 'guards/adminguard';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { ViewManufacturerComponent } from './view-manufacturer/view-manufacturer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddsupplierComponent } from './addsupplier/addsupplier.component';
import { UpdatesupplierComponent } from './updatesupplier/updatesupplier.component';
import { ViewsupplierComponent } from './viewsupplier/viewsupplier.component';
import { InfoaboutoperationComponent } from './infoaboutoperation/infoaboutoperation.component';
import { BlackfungusComponent } from './blackfungus/blackfungus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PatientinfoFaqComponent } from './patientinfo-faq/patientinfo-faq.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ViewprodComponent } from './viewprod/viewprod.component';
import { ProductEventemitterComponent } from './product-eventemitter/product-eventemitter.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { UserComponent } from './user/user.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'aboutus', component: AboutusComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'manufacturers', component: ManufacturersComponent },
  { path: 'condition', component: ConditionComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'home', component: HomeComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'updatesupplier', component: UpdatesupplierComponent },
  { path: 'addsupplier', component: AddsupplierComponent },
  { path: 'viewsupplier', component: ViewsupplierComponent },
  { path: 'view-manufacturer', component: ViewManufacturerComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGaurd] },
  { path: 'blackfungus', component: BlackfungusComponent },
  { path: 'infoaboutoperation', component: InfoaboutoperationComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'faq', component: PatientinfoFaqComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:pid', component: ProductComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'updateproduct', component: UpdateproductComponent },
  { path: 'viewproduct', component: ViewprodComponent },
  { path: 'producteventemitter', component: ProductEventemitterComponent },
  { path: 'user', component: UserComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'updateuser', component: UpdateUserComponent },
  { path: 'singleuser/:id', component: SingleUserComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
