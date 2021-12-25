import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ACME';
  showInsturction:boolean = true;
  hideInstruction(){
    this.showInsturction = false;
  }
  showInstruction(){
    this.showInsturction = true;
  }
}
