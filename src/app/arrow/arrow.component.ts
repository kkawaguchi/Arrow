import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Arrow, ArrowDirection, Point } from '../models/arrow';


@Component({
    selector: 'app-arrow',
    templateUrl: './arrow.component.html',
    styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements OnChanges {
    @Input() arrow: Arrow;
    arrowStyle: any = {};
    arrowTopStyle: any = {};
    arrowBottomStyle: any = {};
    arrowHeadStyle: any = {};

    constructor() { }

    ngOnChanges() {
        this.setArrowPosition(this.arrow);
        this.setLineWidth(this.arrow.lineWidth, this.arrow.getArrowDirection());
        this.setColor(this.arrow.color);
        this.setArrowHead(this.arrow.arrowHeadWidth, this.arrow.color || 'black', this.arrow.getArrowDirection());
    }

    setArrowPosition(arrow: Arrow) {
        // 左上位置を設定
        this.arrowStyle['top.px'] = arrow.startPoint.y < arrow.endPoint.y ? arrow.startPoint.y : arrow.endPoint.y + arrow.lineWidth*2;
        this.arrowStyle['left.px'] = arrow.startPoint.x < arrow.endPoint.x ? arrow.startPoint.x : arrow.endPoint.x;

        // 上段部の高さ・幅を設定
        this.arrowTopStyle['width.px'] = arrow.getAbsWidth();
        if(arrow.isSameY()){
            this.arrowTopStyle['height.px'] = 0;
        }
        else if (arrow.isDown()) {
            this.arrowTopStyle['height.px'] = arrow.getAbsHeigth() / 2 - arrow.lineWidth / 2;
        }else{
            this.arrowTopStyle['height.px'] = arrow.getAbsHeigth() / 2 - arrow.lineWidth / 2 - arrow.lineWidth*2;
        }
        // 下段部の高さ・幅を設定
        this.arrowBottomStyle['width.px'] = arrow.getAbsWidth();
        if(arrow.isSameY()){
            this.arrowBottomStyle['height.px'] = 0;
        }
        else
        if (arrow.isDown()) {
            this.arrowBottomStyle['height.px'] = arrow.getAbsHeigth() / 2 + arrow.lineWidth / 2 - arrow.lineWidth*2;
        }else{
            this.arrowBottomStyle['height.px'] = arrow.getAbsHeigth() / 2 + arrow.lineWidth / 2 ;
        }
        // 矢印部の位置を設定
        let arrowHeadTopLeftPoint = arrow.getArrowHeadTopLeftPoint();
        this.arrowHeadStyle['top.px'] = arrowHeadTopLeftPoint.y;
        this.arrowHeadStyle['left.px'] = arrowHeadTopLeftPoint.x;
    }
    setLineWidth(lineWidth: number, direction: ArrowDirection) {
        if (~[ArrowDirection.UPLEFT, ArrowDirection.DOWNRIGHT].indexOf(direction)) {
            this.arrowTopStyle['border-right-width.px'] = 0;
            this.arrowTopStyle['border-left-width.px'] = lineWidth;
            this.arrowBottomStyle['border-right-width.px'] = lineWidth;
            this.arrowBottomStyle['border-left-width.px'] = 0;
        } else if (~[ArrowDirection.UP, ArrowDirection.DOWN].indexOf(direction)) {
            this.arrowTopStyle['border-right-width.px'] = lineWidth / 2;
            this.arrowTopStyle['border-left-width.px'] = lineWidth / 2;
            this.arrowBottomStyle['border-right-width.px'] = lineWidth / 2;
            this.arrowBottomStyle['border-left-width.px'] = lineWidth / 2;
        } else {
            this.arrowTopStyle['border-right-width.px'] = lineWidth;
            this.arrowTopStyle['border-left-width.px'] = 0;
            this.arrowBottomStyle['border-right-width.px'] = 0;
            this.arrowBottomStyle['border-left-width.px'] = lineWidth;
        }

        this.arrowBottomStyle['border-top-width.px'] = lineWidth;
    }
    setColor(color: string) {
        this.arrowTopStyle['border-color'] = color;
        this.arrowBottomStyle['border-color'] = color;
    }

    setArrowHead(arrowHeadWidth: number, color: string, arrowDirection: ArrowDirection) {
        this.arrowHeadStyle['border-right-color'] = 'transparent';
        this.arrowHeadStyle['border-bottom-color'] = 'transparent';
        this.arrowHeadStyle['border-left-color'] = 'transparent';
        this.arrowHeadStyle['border-top-color'] = 'transparent';
        this.arrowHeadStyle['border-width.px'] = arrowHeadWidth;

        if (arrowDirection == ArrowDirection.LEFT) {
            this.arrowHeadStyle['border-right-color'] = color;
        } else if (~[ArrowDirection.UPLEFT, ArrowDirection.UP, ArrowDirection.UPRIGHT].indexOf(arrowDirection)) {
            this.arrowHeadStyle['border-bottom-color'] = color;
        } else if (arrowDirection == ArrowDirection.RIGHT) {
            this.arrowHeadStyle['border-left-color'] = color;
        } else {
            this.arrowHeadStyle['border-top-color'] = color;
        }
    }

}
