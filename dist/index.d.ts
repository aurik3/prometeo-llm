interface IPdf {
    url?: string;
    query?: string;
}

interface IYoutube {
    id_video: string;
    query: string;
}

interface IAdapter {
    adapter: 'pdf' | 'youtube';
    pdf?: IPdf;
    youtube?: IYoutube;
}

declare class PrometeoLLM {
    private adapterController;
    constructor();
    init(options: IAdapter): Promise<any>;
}

export { PrometeoLLM };
