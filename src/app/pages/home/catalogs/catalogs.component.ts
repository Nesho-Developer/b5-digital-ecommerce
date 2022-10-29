import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/service/product.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss'],
  host: { 'z-index': '1000' },
})
export class CatalogsComponent implements OnInit {
  catalog = this.productService.getCatalogs();
  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {}
}
