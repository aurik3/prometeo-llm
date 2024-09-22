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
export {
  prometeo_default as PrometeoLLM
};
