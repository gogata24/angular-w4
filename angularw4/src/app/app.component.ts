import { Component } from '@angular/core';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  accident: boolean = false;
  accidentButtonActive: boolean = true;

  onAccidentClick() {
    this.accident = true;
    this.accidentButtonActive = false;

    setTimeout(() => {
      this.accident = false;
    }, 10000);

    setTimeout(() => {
      this.accidentButtonActive = true;
    }, 20000);
  }
}
