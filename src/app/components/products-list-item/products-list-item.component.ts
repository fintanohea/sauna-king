import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit {
  @Input() product: Product;
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() loadedProducts = new EventEmitter<Product[]>();

  constructor(private productsService: ProductsService) { }

  getProduct(id) {
    this.isLoading.emit(true)

    this.productsService.getProduct(id)
    .subscribe(ps => {
      this.loadedProducts.emit([ps]);
    })

    this.isLoading.emit(false)    
  }

  modifyProduct(id) {
    this.isLoading.emit(true)

    this.productsService.modifyProduct(id)
    .subscribe(ps => {
      this.loadedProducts.emit(ps);
    })

    this.isLoading.emit(false) 
  }

  ngOnInit() {
  }

}
