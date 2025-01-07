import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product: any = {};

  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId){
      this.apiService.getProductById(productId).subscribe(
        (data) =>{
          this.product = data;
        },
        (error) => {
          console.error('Error al cargar el producto: ',error);
        }
      );
    }
  }

}
