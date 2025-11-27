import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signaldemo');
  public randomNumber = signal("hi");

  ngOnInit() {
      setTimeout(() => {this.randomNumber.update(v=> v+ " suchitra");},1000);
  }
}
