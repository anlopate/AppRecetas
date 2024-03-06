"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));
    it('should create the app', () => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
