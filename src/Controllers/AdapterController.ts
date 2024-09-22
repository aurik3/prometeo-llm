import PdfHandler from "../handlers/PdfHandler";
import YoutubeHandler from "../handlers/YoutubeHandler";
import { IAdapter } from "../interfaces/IAdapter";

class AdapterController {



private PdfHandler: PdfHandler;
private YoutubeHandler: YoutubeHandler;
constructor(){

    this.PdfHandler = new PdfHandler();
    this.YoutubeHandler = new YoutubeHandler();

}


async getAdapter(options: IAdapter) {
    const type = options.adapter


    switch (type) {
        case 'pdf':
            return this.PdfHandler.search(options.pdf)
        case 'youtube':
            return this.YoutubeHandler.search(options.youtube)
        default:
            return 'no adapter found'
    }
}
}


export default AdapterController