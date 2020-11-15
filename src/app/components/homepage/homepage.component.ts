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
  items: Array<Product> = []
  loading = false

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loading = true

    this.productsService.getAllProducts('0','5')
    .subscribe(ps => {
      ps.forEach( p => {
        this.items.push(p)
      })
      this.loading = false
    })
  }

}
