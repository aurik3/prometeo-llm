import { PdfLoader, RAGApplicationBuilder } from "@llm-tools/embedjs";
import { IPdf } from "../interfaces/IPdf";
import { LocalHuggingFaceEmbeddings } from "../embeddings/LocalEmbedding";
import { GptModel } from "../model/ChatgptModel";
import { LanceDb } from "../vectorDB/LandDB";


class PdfHandler{
    constructor(){
        
    }

    async search(options: IPdf | undefined): Promise<any> {
        const modelName = 'gpt-4o';     

      const pdf = await new RAGApplicationBuilder()
        .setEmbeddingModel( new LocalHuggingFaceEmbeddings() )
        .setModel( new GptModel({ modelName }) )
        .setVectorDb( new LanceDb({ path: 'pdf', isTemp: true }) )
        .build();


        await pdf.addLoader( new PdfLoader({ filePathOrUrl: options?.url ?? '' }) );

        const resp = await pdf.query( options?.query ?? '' );
        
        return 'Llego a pdf handler';
    }
}

export default PdfHandler