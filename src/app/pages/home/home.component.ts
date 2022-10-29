import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CatalogsComponent,
    SideNavComponent,
    ProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
