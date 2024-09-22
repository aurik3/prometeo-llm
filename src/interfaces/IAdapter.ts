import { IPdf } from "./IPdf";
import { IYoutube } from "./IYoutube";

export interface IAdapter {
    adapter: 'pdf'|'youtube';
    pdf?: IPdf;
    youtube?: IYoutube;
}