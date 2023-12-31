import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService,
    private sidebarService:SidebarService) {}

  ngOnInit(): void {
    setTimeout(() => {
      customInitFunctions();

      console.log(this.sidebarService.cargarMenu());
    }, 50);
  }
}
