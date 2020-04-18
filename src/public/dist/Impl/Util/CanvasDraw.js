"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CanvasDraw {
    static drawImage(ctx, vOutline, canvasH, image) {
        const { width, height, x, y } = vOutline;
        ctx.drawImage(image, x, canvasH - y - height, width, height);
    }
    static drawRect(ctx, vOutline, canvasH) {
        const { width, height, x, y } = vOutline;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x, canvasH - y - height, width, height);
    }
    static drawDigitalDisplay(ctx, vOutline, image) {
        ctx.drawImage(image, 10, 10);
    }
}
exports.CanvasDraw = CanvasDraw;
//# sourceMappingURL=CanvasDraw.js.map