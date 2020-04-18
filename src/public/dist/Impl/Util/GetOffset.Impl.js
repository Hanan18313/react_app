"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XType_enum_1 = require("../../Enum/XType.enum");
const YType_enum_1 = require("../../Enum/YType.enum");
const LinearTrans_Impl_1 = require("./LinearTrans.Impl");
class GetOffset {
    static GetValue(anchorOutline, selfOutline, selfLocation) {
        const { xAlignment, yAlignment } = selfLocation;
        let x, y;
        const xOffset = LinearTrans_Impl_1.LinearTrans.GetMotiValue(selfLocation.xOffset);
        const yOffset = LinearTrans_Impl_1.LinearTrans.GetMotiValue(selfLocation.yOffset);
        if (xAlignment === XType_enum_1.XType['LEFT|LEFT']) {
            x = anchorOutline.x + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['LEFT|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['LEFT|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['LEFT|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|LEFT']) {
            x = anchorOutline.x - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|LEFT']) {
            x = anchorOutline.x - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|LEFT']) {
            x = anchorOutline.x - selfOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width - selfOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 - selfOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase - selfOutline.xBase + xOffset;
        }
        if (yAlignment === YType_enum_1.YType['BOTTOM-BOTTOM']) {
            y = anchorOutline.y + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['BOTTOM-TOP']) {
            y = anchorOutline.y + anchorOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['BOTTOM-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['BOTTOM-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-BOTTOM']) {
            y = anchorOutline.y - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-TOP']) {
            y = anchorOutline.y + anchorOutline.height - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-BOTTOM']) {
            y = anchorOutline.y - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-TOP']) {
            y = anchorOutline.y + anchorOutline.height - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-BOTTOM']) {
            y = anchorOutline.y - selfOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-TOP']) {
            y = anchorOutline.y + anchorOutline.height - selfOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 - selfOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase - selfOutline.yBase + yOffset;
        }
        return {
            x,
            y,
        };
    }
}
exports.GetOffset = GetOffset;
//# sourceMappingURL=GetOffset.Impl.js.map