import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vasa masta - vasa basta';

  readonly myTitle = 'Vaša masta - vaša basta'

  constructor(private titleServis: Title) { }

  ngOnInit(): void {
    this.titleServis.setTitle(this.myTitle);
  }
}
