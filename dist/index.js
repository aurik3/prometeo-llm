"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PrometeoLLM: () => prometeo_default
});
module.exports = __toCommonJS(src_exports);

// src/handlers/PdfHandler.ts
var PdfHandler = class {
  constructor() {
  }
  async search(options) {
    return "Llego a pdf handler";
  }
};
var PdfHandler_default = PdfHandler;

// src/handlers/YoutubeHandler.ts
var YoutubeHandler = class {
  constructor() {
  }
  async search(options) {
    return options?.query;
  }
};
var YoutubeHandler_default = YoutubeHandler;

// src/Controllers/AdapterController.ts
var AdapterController = class {
  PdfHandler;
  YoutubeHandler;
  constructor() {
    this.PdfHandler = new PdfHandler_default();
    this.YoutubeHandler = new YoutubeHandler_default();
  }
  async getAdapter(options) {
    const type = options.adapter;
    switch (type) {
      case "pdf":
        return this.PdfHandler.search(options.pdf);
      case "youtube":
        return this.YoutubeHandler.search(options.youtube);
      default:
        return "no adapter found";
    }
  }
};
var AdapterController_default = AdapterController;

// src/prometeo.ts
var PrometeoLLM = class {
  adapterController;
  constructor() {
    this.adapterController = new AdapterController_default();
  }
  async init(options) {
    return await this.adapterController.getAdapter(options);
  }
};
var prometeo_default = PrometeoLLM;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrometeoLLM
});
