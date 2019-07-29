import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-flip-number',
  templateUrl: './flip-number.component.html',
  styleUrls: ['./flip-number.component.css']
})
export class FlipNumberComponent implements OnInit {
  @Input() previousNumber: number;
  @Input() currentNumber: number;
  prevDigits: number[] = [];
  digits: number[] = [];

  constructor() { }

  ngOnInit() {
    this.previousNumber = this.previousNumber || (this.currentNumber - 1);
    this.prevDigits = this.getDigits(this.previousNumber);
    this.digits = this.getDigits(this.currentNumber);
  }

  getDigits(num) {
    const digits = [];
    while (num) {
      digits.push(num % 10);
      num = Math.floor(num / 10);
    }
    return digits.reverse();
  }

}
