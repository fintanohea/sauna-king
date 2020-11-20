import { Component, OnInit } from '@angular/core'
import { ProductsService } from 'src/app/services/products-service/products.service'
import { Product } from 'src/app/models/Product'
import { Category } from 'src/app/models/Category'
import { Vendor } from 'src/app/models/Vendor'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  categories: Category[] = []
  products: Product[] = []
  vendors: Vendor[] = []
  loadingProducts = false
  loadingCatagories = false
  selectedNav: string = 'all';

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadingProducts = true

    this.getAllProducts()

    this.getAllCategories()
  }

  getAllProducts() {
    this.loadingProducts = true

    this.productsService.getAllProducts()
      .subscribe(products => {
        this.loadingProducts = false
        this.products = products
      })
  }

  getAllCategories() {
    this.loadingCatagories = true

    this.productsService.getCategories()
      .subscribe(categories => {
        this.loadingCatagories = false
        this.categories = categories
      })

    this.getVendors()  
  }

  isLoadingFromProduct(isLoading: boolean) {
    this.loadingProducts = isLoading
  }

  loadedProducts(loadedProducts: Product[]) {
    this.products = loadedProducts
  }

  getProductsByCategory(category: string) {
    this.loadingProducts = true

    this.productsService.getProductsByCategory(category)
      .subscribe(products => {
        this.loadingProducts = false
        this.products = products
      })

    this.getVendors(category)  

  }

  getVendors(category?: string) {
    this.productsService.getVendors(category)
    .subscribe(vendors => {
      this.vendors = vendors
    })
  }

  setActive(link: string){
    this.selectedNav = link
  }
}
