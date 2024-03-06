"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const firestore_service_1 = require("./firestore.service");
describe('FirestoreService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(firestore_service_1.FirestoreService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
