"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const core_1 = require("@angular/core");
let HomePage = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HomePage = _classThis = class {
        constructor(firestoreService, router) {
            this.firestoreService = firestoreService;
            this.router = router;
            this.recetaEditando = {};
            this.arrayColeccionRecetas = [{
                    id: "",
                    receta: {}
                }];
            this.idRecetaSelec = "";
            this.obtenerListaRecetas();
        }
        obtenerListaRecetas() {
            // Hacer una consulta cada vez que se detectan nuevos datos en la BD
            this.firestoreService.consultar("recetas").subscribe((datosRecibidos) => {
                // Limpiar el array para que no se dupliquen los datos anteriores
                this.arrayColeccionRecetas = [];
                // Recorrer todos los datos recibidos de la BD
                datosRecibidos.forEach((datosReceta) => {
                    // Cada elemento de la BD se almacena en el array que se muestra en pantalla
                    this.arrayColeccionRecetas.push({
                        id: datosReceta.payload.doc.id,
                        receta: datosReceta.payload.doc.data()
                    });
                });
            });
        }
        selecReceta(idReceta, recetaSelec) {
            this.recetaEditando = recetaSelec;
            this.idRecetaSelec = idReceta;
            this.router.navigate(['detalle', this.idRecetaSelec]);
        }
        // clicBotonInsertar() {
        //   this.firestoreService.insertar("recetas", this.recetaEditando).then(() => {
        //     console.log('Receta creada correctamente!');
        //     this.recetaEditando= {} as Receta;
        //   }, (error) => {
        //     console.error(error);
        //   });
        // }
        // clicBotonBorrar() {
        //   this.firestoreService.borrar("recetas", this.idRecetaSelec).then(() => {
        //     console.log('Receta borrada correctamente!');
        //     this.recetaEditando= {} as Receta;
        //     this.idRecetaSelec = "";
        //   }, (error) => {
        //     console.error(error);
        //   });
        // }
        clicBotonModificar() {
            this.firestoreService.modificar("recetas", this.idRecetaSelec, this.recetaEditando).then(() => {
                console.log('Receta modificada correctamente!');
            }, (error) => {
                console.error(error);
            });
        }
    };
    __setFunctionName(_classThis, "HomePage");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomePage = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomePage = _classThis;
})();
exports.HomePage = HomePage;
