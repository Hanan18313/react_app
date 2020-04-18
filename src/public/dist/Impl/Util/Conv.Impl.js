"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conv {
    RLengthFromVirtual(vl) {
        return vl * this.vres;
    }
    ;
    RxFromVirtual(vx) {
        return vx * this.a1 + this.b1;
    }
    ;
    RyFromVirtual(vy) {
        return vy * this.a2 + this.b2;
    }
    ;
    VLengthFromReal(rl) {
        return rl / this.vres;
    }
    ;
    VxFromReal(rx) {
        return (rx - this.b1) / this.a1;
    }
    ;
    VyFromReal(ry) {
        return (ry - this.b2) / this.a2;
    }
    ;
    RealSceneFitCanvas(realW, realH, canvasW, canvasH) {
        if (canvasW / canvasH > realW / realH) {
            this.vres = realH / canvasH;
            this.b1 = -(this.RLengthFromVirtual(canvasW) - realW) / 2;
            this.b2 = 0;
        }
        else {
            this.vres = realW / canvasW;
            this.b1 = 0;
            this.b2 = -(this.RLengthFromVirtual(canvasH) - realH) / 2;
        }
        this.a1 = this.a2 = this.vres;
    }
    ;
}
exports.Conv = Conv;
//# sourceMappingURL=Conv.Impl.js.map