import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'services/product.service';

@Component({
  selector: 'app-product-eventemitter',
  templateUrl: './product-eventemitter.component.html',
  styleUrls: ['./product-eventemitter.component.scss'],
})
export class ProductEventemitterComponent implements OnInit {
  myEventEmitter: EventEmitter<string>;
  @Output() fireEvent: EventEmitter<string>;
  instock: number = 5;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.myEventEmitter = new EventEmitter<string>();
    this.fireEvent = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.testEvent();
    this.myEventEmitter.emit('Hello from myEventEmitter');
  }
  testEvent() {
    this.myEventEmitter.subscribe((data) => {
      console.log(data);
    });
  }
  reduceOne() {
    if (this.instock == 1) {
      this.instock = this.instock - 1;
      this.sendMessageToOuterComponent();
    } else if (this.instock == 0) {
      return;
    } else {
      this.instock = this.instock - 1;
    }
  }
  sendMessageToOuterComponent() {
    this.fireEvent.emit('Hello...Product is out of stock');
  }
}
