import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void{
    this.apiService.getProducts().subscribe(
      (data) => {
        this.products = data.products;
      },
      (error) => {
        console.error(`Error al cargar productos: `, error);
      }
    );
  }

}
