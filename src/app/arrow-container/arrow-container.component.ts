import { Component, OnInit,OnChanges } from '@angular/core';
import { Arrow, Point } from '../models/arrow';
@Component({
  selector: 'app-arrow-container',
  templateUrl: './arrow-container.component.html',
  styleUrls: ['./arrow-container.component.css']
})
export class ArrowContainerComponent implements OnInit,OnChanges {
    startPointx: number = 0;
    startPointy: number= 100;
    endPointx : number= 100;
    endPointy : number= 0;
    lineWidth: number= 8;
    color: string = '#FF0000';

    cArrow :Arrow;






  arrows: Arrow[] = [
    new Arrow(new Point(0, 0), new Point(0, 100), 5, 8, ''),
    new Arrow(new Point(0, 0), new Point(50, 100), 5, 8, ''),
    new Arrow(new Point(0, 0), new Point(100, 100), 5, 8, '')
    // new Arrow(new Point(80, 60), new Point(200, 60), 5, 10, ''),
    // new Arrow(new Point(0, 100), new Point(100, 0), 5, 8, ''),
    // new Arrow(new Point(10, 100), new Point(10, 500), 5, 8, ''),
    // new Arrow(new Point(20, 50), new Point(20, 0  ), 5, 8, ''),
    // new Arrow(new Point(20, 0), new Point(20, 50  ), 5, 8, ''),
    // new Arrow(new Point(20, 0), new Point(20, 50  ), 5, 8, ''),
    // new Arrow(new Point(0, 50), new Point(100, 50), 5, 8, ''),
    // new Arrow(new Point(200, 50), new Point(150, 0), 5, 8, ''),
  ];





  constructor() { }

  ngOnInit() {
    this.createCArrow()
  }

  ngOnChanges(){



  }
createCArrow(){
  this.cArrow = new Arrow(new Point(this.startPointx, this.startPointy), new Point(this.endPointx,this.endPointy), 5, this.lineWidth, this.color);
}

}
