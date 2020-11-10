import { Component, OnInit } from '@angular/core'
import { ProductsService } from 'src/app/services/products-service/products.service'
import { Product } from 'src/app/models/Product'
import { Category } from 'src/app/models/Category'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  categories: Category[]
  products: Product[] = []
  loading = false
  selectedNav: string = 'all';

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loading = true

    this.getAllProducts()

    this.getAllCategories()
  }

  getAllProducts() {
    this.loading = true

    this.productsService.getAllProducts()
      .subscribe(products => {
        this.loading = false
        this.products = products
      })
  }

  getAllCategories() {
    this.productsService.getCategories()
      .subscribe(categories => {
        this.categories = categories
      })
  }

  isLoadingFromProduct(isLoading: boolean) {
    this.loading = isLoading
  }

  loadedProducts(loadedProducts: Product[]) {
    this.products = loadedProducts
  }

  getProductsByCategory(category: string){
    this.loading = true

    this.productsService.getProductsByCategory(category)
      .subscribe(products => {
        this.loading = false
        this.products = products
      })
  }

  setActive(link: string){
    this.selectedNav = link
  }
}
