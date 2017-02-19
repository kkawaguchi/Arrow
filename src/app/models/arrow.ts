export class Arrow {
    startPoint: Point;
    endPoint: Point;
    zIndex: number;
    lineWidth: number;
    arrowHeadWidth: number;
    color: string;

    constructor(sPoint: Point, ePoint: Point, zIndex: number, width: number, color: string) {
        this.startPoint = sPoint;
        this.endPoint = ePoint;
        this.zIndex = zIndex;
        this.lineWidth = width;
        this.arrowHeadWidth = this.lineWidth * 2;
        this.color = color;

        if(this.isSameX()){
            this.endPoint.x = this.startPoint.x;
        }

        if(this.isSameY()){
            this.endPoint.y = this.startPoint.y;
        }

    }

    getHeigth(): number {
        return this.endPoint.y - this.startPoint.y;
    }

    getWidth(): number {
        return this.endPoint.x - this.startPoint.x;
    }

    getAbsHeigth(): number {
        return Math.abs(this.endPoint.y - this.startPoint.y);
    }

    getAbsWidth(): number {
        return Math.abs(this.endPoint.x - this.startPoint.x);
    }

    isSameX(): boolean {
        return this.getAbsWidth() < this.lineWidth*3;
    }

    isSameY(): boolean {
        return this.getAbsHeigth() < this.lineWidth*3;
    }

    isUp(): boolean {
        return !this.isSameY() && this.getHeigth() < 0;
    }

    isDown(): boolean {
        return !this.isSameY() && this.getHeigth() > 0;
    }

    isRight(): boolean {
        return !this.isSameX() && this.getWidth() > 0;
    }

    isLeft(): boolean {
        return !this.isSameX() && this.getWidth() < 0;
    }

    getArrowHeadTopLeftPoint(): Point {
        let arrowDirection = this.getArrowDirection();

        let x;
        let y;

        if (this.isSameY()) {
            y = this.endPoint.y - (this.arrowHeadWidth - this.lineWidth / 2);
        } else if (this.isUp()) {
            y = this.endPoint.y - (this.arrowHeadWidth * 1.5 - this.lineWidth)
        } else {
            y = this.endPoint.y - this.lineWidth*2;
        }

        if (this.isSameX()) {
            x = this.endPoint.x - (this.arrowHeadWidth / 2 + this.lineWidth / 2);
        } else if (this.isRight()) {
            x = this.endPoint.x - (this.arrowHeadWidth/ 2 + this.lineWidth*0.5);
        } else {
            x = this.endPoint.x - (this.arrowHeadWidth / 2 + this.lineWidth / 2);
        }

        if (arrowDirection == ArrowDirection.LEFT) {
            return new Point(this.endPoint.x - (this.arrowHeadWidth * 2), this.endPoint.y - (this.arrowHeadWidth - this.lineWidth*2.5));
        } else if (arrowDirection == ArrowDirection.RIGHT) {
            return new Point(this.endPoint.x, this.endPoint.y - (this.arrowHeadWidth- this.lineWidth*2.5));
        } else {
            return new Point(x, y);
        }
    }

    getArrowDirection(): ArrowDirection {
        if (this.isSameY()) {
            if (this.getWidth() > 0) {
                return ArrowDirection.RIGHT;
            } else {
                return ArrowDirection.LEFT;
            }
        } else if (this.isSameX()) {
            if (this.getHeigth() > 0) {
                return ArrowDirection.DOWN;
            } else {
                return ArrowDirection.UP;
            }
        } else {
            if (this.getWidth() > 0) {
                if (this.getHeigth() > 0) {
                    return ArrowDirection.DOWNRIGHT;
                } else {
                    return ArrowDirection.UPRIGHT;
                }
            } else {
                if (this.getHeigth() > 0) {
                    return ArrowDirection.DOWNLEFT;
                } else {
                    return ArrowDirection.UPLEFT;
                }
            }

        }
    }
}

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export enum ArrowDirection {
    UP, UPRIGHT, RIGHT, DOWNRIGHT, DOWN, DOWNLEFT, LEFT, UPLEFT
}

