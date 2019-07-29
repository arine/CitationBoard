/* Modified code by Chuck Grimmet (http://www.cagrimmett.com/til/2018/01/05/css-confetti.html)
 */
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrls: ['./confetti.component.css']
})
export class ConfettiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 250; i++) {
      this.create(i);
    }
  }

  create(i) {
    const width = Math.random() * 8;
    const height = width * 0.4;
    const colourIdx = Math.ceil(Math.random() * 3);
    let colour = 'red';
    switch (colourIdx) {
      case 1:
        colour = 'yellow';
        break;
      case 2:
        colour = 'blue';
        break;
      default:
        colour = 'red';
    }
    $('<div class="confetti-' + i + ' ' + colour + '"></div>').css({
      width: width + 'px',
      height: height + 'px',
      top: - Math.random() * 20 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() + 0.5,
      transform: 'rotate(' + Math.random() * 360 + 'deg)'
    }).appendTo('.confetti-wrapper');
    this.drop(i);
  }

  drop(x) {
    $('.confetti-' + x).animate({
      top: '100%',
      left: '+=' + Math.random() * 15 + '%'
    }, Math.random() * 3000 + 3000, () => {
      this.reset(x);
    });
  }

  reset(x) {
    $('.confetti-' + x).animate({
      top: - Math.random() * 20 + '%',
      left: '-=' + Math.random() * 15 + '%'
    }, 0, () => {
      this.drop(x);
    });
  }
}
