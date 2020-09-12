import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-steamcube-product',
  templateUrl: './steamcube-product.component.html',
  styleUrls: ['./steamcube-product.component.scss']
})

export class SteamcubeProductComponent implements OnInit {
  product: Product

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProductByTitle("Steamcube")
    .subscribe(p => {
      this.product = p
    })
  }

}
