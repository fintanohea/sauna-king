import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productIdToGet: string = this.route.snapshot.paramMap.get("id")
  product: Product
  loading: boolean = false


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loading = true

    this.productsService.getProduct(this.productIdToGet)
    .subscribe(p => {
      this.product = p
      this.loading = false
    })
  }

}
