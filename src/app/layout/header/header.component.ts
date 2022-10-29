import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {ToolBarComponent} from "./tool-bar/tool-bar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ToolBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
