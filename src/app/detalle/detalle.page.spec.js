"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const detalle_page_1 = require("./detalle.page");
describe('DetallePage', () => {
    let component;
    let fixture;
    beforeEach((0, testing_1.async)(() => {
        fixture = testing_1.TestBed.createComponent(detalle_page_1.DetallePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
