import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/services/products-service/products.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  product: Product
  items: Array<Product>
  loading = false

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loading = true

    this.productsService.getProductByTitle("Steamcube")
    .subscribe(p => {
      this.product = p
      this.loading = false
      this.items = [this.product, this.product, this.product, this.product, this.product]
    })
  }

}
