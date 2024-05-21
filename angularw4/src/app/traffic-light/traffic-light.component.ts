import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.scss'
})
export class TrafficLightComponent implements OnInit, OnChanges, OnDestroy {
  @Input() direction: 'column' | 'row' = 'column'
  @Input({required: true}) color: 'red' | 'yellow' | 'green' | 'default' = 'default';
  @Input() accident: boolean = false;
  private previousColor: 'red' | 'yellow' | 'green' | 'default' = 'default';
  private timerColors: any;
  private timerYellow: any;

  ngOnInit(): void {
    this.start();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accident'].isFirstChange()) 
      return;

    clearInterval(this.timerColors);
    clearInterval(this.timerYellow);

    if (this.accident) {
      this.color = 'yellow';
      this.timerColors = setInterval(() => this.flashYellowLight(), 500);
    } else {
      this.color = this.previousColor == 'red' ? 'green' : 'red';
      this.start();
    }
  }

  start() {
    this.timerColors = setInterval(() => this.changeColor(), 7000);

    setTimeout(() => {
      this.changeToYellow();
      this.timerYellow = setInterval(() => this.changeToYellow(), 7000);
    }, 5000);
  }

  changeColor() {
    this.color = this.previousColor == 'red' ? 'green' : 'red';
  }

  changeToYellow() {
    this.previousColor = this.color;
    this.color = 'yellow';
  }

  flashYellowLight() {
    this.color = this.color == 'yellow' ? 'default' : 'yellow';
  }

  onCrossClick() {
    if (this.color == 'yellow') {
      alert('Пресичате неправилно!');
    }
  }

  getStyling() {
    if (this.direction == 'column') {
      return {
        width: '70px',
        height: '180px',
        flexDirection: 'column'
      }
    }

    return {
      width: '180px',
      height: '70px',
      flexDirection: 'row'
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timerColors);
    clearInterval(this.timerYellow);
  }
}
