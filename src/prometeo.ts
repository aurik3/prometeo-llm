
import AdapterController from "./Controllers/AdapterController";
import { IAdapter } from "./interfaces/IAdapter";


class PrometeoLLM{
    private adapterController : AdapterController;

    constructor(){
        this.adapterController = new AdapterController();
    }

    async init(options: IAdapter): Promise<any> {
        return await this.adapterController.getAdapter(options);
    }
}

export default PrometeoLLM