import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/shared-services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent implements OnInit {

  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();
  
  themes = [
    { name: 'cupcake', displayName: 'Cupcake' },
    { name: 'dark', displayName: 'Dark' },
    { name: 'light', displayName: 'Light' },
    { name: 'bumblebee', displayName: 'Bumblebee' },
    { name: 'synthwave', displayName: 'Synthwave' },
    { name: 'halloween', displayName: 'Halloween' },
    { name: 'fantasy', displayName: 'Fantasy' },
    { name: 'dracula', displayName: 'Dracula' },
    { name: 'aqua', displayName: 'Aqua' },
    { name: 'luxury', displayName: 'Luxury' },
    { name: 'night', displayName: 'Night' },
  ];

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  setTheme(themeName: string) {
    this.themeService.setTheme(themeName);
  }
}
