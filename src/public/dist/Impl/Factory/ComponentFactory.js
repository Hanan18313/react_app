"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Part_Impl_1 = require("../Part.Impl");
const DigitalMeter_Impl_1 = require("../DigitalMeter.Impl");
const Chart_Impl_1 = require("../Chart.Impl");
const DigitalDial_lmpl_1 = require("../DigitalDial.lmpl");
class ComponentFactory {
    static Create(cls, content) {
        if (cls === 'Part') {
            return new Part_Impl_1.Part(content);
        }
        else if (cls === 'Widget.DigitalMeter') {
            return new DigitalMeter_Impl_1.DigitalMeter(content);
        }
        else if (cls === 'Widget.Chart') {
            return new Chart_Impl_1.Chart(content);
        }
        else if (cls === 'Widget.DigitalDial') {
            return new DigitalDial_lmpl_1.DigitalDial(content);
        }
    }
}
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=ComponentFactory.js.map