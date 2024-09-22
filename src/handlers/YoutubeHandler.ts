import { IYoutube } from "../interfaces/IYoutube";

class YoutubeHandler{
    constructor(){
        
    }

    async search(options: IYoutube | undefined): Promise<any> {

        
        return options?.query;
    }
}

export default YoutubeHandler