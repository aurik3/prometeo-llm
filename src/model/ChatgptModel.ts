import { BaseModel } from '@llm-tools/embedjs';
import { Chunk, Message, ModelResponse } from '@llm-tools/embedjs/dist/global/types';
import { GPTFREE } from 'gptfree-plugin'



  export class GptModel extends BaseModel {
    private readonly modelName: string;
    private readonly gptfreeInstance: GPTFREE;

    constructor({
        modelName,
        temperature,
      }: {
        modelName: string;
        temperature?: number;
      }) {
        super(temperature);
        this.modelName = modelName;
        this.gptfreeInstance = new GPTFREE();
      }
      override async init(): Promise<void> {
        console.log(`Initialized model ${this.modelName}`);
      }

      public async runQuery(
        system: string,
        userQuery: string,
        supportingContext: Chunk[],
        pastConversations: Message[]
      ): Promise<ModelResponse> {
        const messages = [
          { role: "system", content: system },
          ...supportingContext.map((context) => ({
            role: "system",
            content: context.pageContent,
          })),
          ...pastConversations.map((conversation) => {
            return {
              role: conversation.actor === "AI" ? "assistant" : "user",
              content: conversation.content,
            };
          }),
          { role: "user", content: userQuery },
        ];
    
        console.log("Running query with Gpt:", messages);
    
        const options = {
          model: this.modelName,
          debug: true,
        };
    
        try {
          const result = await this.gptfreeInstance.chatCompletions(messages, options);
          console.log("Result from Gpt:", result);
    
          return {
            result: result,
            tokenUse: {
              inputTokens: 0,
              outputTokens: 0,
            },
          };
        } catch (error) {
          console.error("Error running query with g4f:", error);
          throw new Error("Error running query");
        }
      }
    }