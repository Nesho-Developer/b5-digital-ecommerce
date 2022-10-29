import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/service/product.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  catalog = this.productService.getCatalogs();
  constructor(private readonly productService: ProductService) {}
}
