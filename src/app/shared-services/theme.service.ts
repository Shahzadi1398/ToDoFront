import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

   currentTheme = 'dark';
   themeChanged = new EventEmitter<string>();
  constructor() { 
    this.applyTheme(this.currentTheme);
  }

  setTheme(themeName: string) {
    this.currentTheme = themeName;
    document.body.setAttribute('data-theme', themeName);
    this.themeChanged.emit(themeName);
  }

  private applyTheme(themeName: string) {
    document.body.setAttribute('data-theme', themeName);
    this.themeChanged.emit(themeName);
  }
  

}
