import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { ConditionComponent } from './condition/condition.component';
import { FooterComponent } from './footer/footer.component';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { UpdatemanufacturerComponent } from './updatemanufacturer/updatemanufacturer.component';
import { AddmanufacturerComponent } from './addmanufacturer/addmanufacturer.component';
import { AdminGaurd } from 'guards/adminguard';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewManufacturerComponent } from './view-manufacturer/view-manufacturer.component';
import { AddsupplierComponent } from './addsupplier/addsupplier.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UpdatesupplierComponent } from './updatesupplier/updatesupplier.component';
import { ViewsupplierComponent } from './viewsupplier/viewsupplier.component';
import { BlackfungusComponent } from './blackfungus/blackfungus.component';
import { InfoaboutoperationComponent } from './infoaboutoperation/infoaboutoperation.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PatientinfoFaqComponent } from './patientinfo-faq/patientinfo-faq.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ViewprodComponent } from './viewprod/viewprod.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductEventemitterComponent } from './product-eventemitter/product-eventemitter.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    AboutusComponent,
    FacilitiesComponent,
    ConditionComponent,
    FooterComponent,
    ManufacturersComponent,
    UpdatemanufacturerComponent,
    AddmanufacturerComponent,
    AdminComponent,
    HomeComponent,
    GalleryComponent,
    ViewManufacturerComponent,
    AddsupplierComponent,
    SupplierComponent,
    UpdatesupplierComponent,
    ViewsupplierComponent,
    BlackfungusComponent,
    InfoaboutoperationComponent,
    ContactusComponent,
    PatientinfoFaqComponent,
    AddproductComponent,
    UpdateproductComponent,
    ViewprodComponent,
    ProductComponent,
    ProductsComponent,
    ProductEventemitterComponent,
    AddUserComponent,
    UserComponent,
    UpdateUserComponent,
    SingleUserComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AdminGaurd],
  bootstrap: [AppComponent],
})
export class AppModule {}
