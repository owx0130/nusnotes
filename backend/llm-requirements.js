//Import LangChain requirements
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import "dotenv/config";

//Set up ChatGPT API/LangChain
const API_KEY = process.env.API_KEY;
const model = new OpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0,
  maxTokens: -1,
  openAIApiKey: API_KEY,
});

//Set up Prompt Templates
const summaryPrompt = PromptTemplate.fromTemplate(
  `Given a set of notes on {subject} of {topic} topic as input, please consolidate a set of notes that students can use for future learning and revision. 
 
  
  Notes: {input} `
);
const combineSummaryPrompt = PromptTemplate.fromTemplate(
  `Compile the notes provided in the array of content into a clear and concise document. Ensure a logical flow of information, linking related concepts smoothly. Aim for a complete set of notes in point form that enables university students to refer to for revision on {subject} {topic} topic. Keep this under 1500 words.

  Array of content: {input}`
);

const questionPrompt = PromptTemplate.fromTemplate(
  `Given a set of notes on {subject} of {topic} topic as input, please consolidate a set of 5 multiple choice questions and their corresponding answers that students can use for future learning and revision. 
 
  Notes: {input} `
)

const combineQuestionPrompt = PromptTemplate.fromTemplate(
  `Compile the questions and answers provided in the array of content into a clear and concise document. Aim for a complete set of questions which enables university students to use for revision on {subject} {topic} topic. Keep it to a minimum of 5 questions and a maximum of 15 questions.

  Array of content: {input}`
);

const allArticlesSummaryPrompt = PromptTemplate.fromTemplate(
  `You will be provided with an array of article text from different articles. Write a short
  paragraph containing short descriptions of every article. Provide this paragraph as your
  response.

  Array of content: {input}`
);
const inferringPrompt = PromptTemplate.fromTemplate(
  `Given a text body, perform the following steps on it:

  1. Infer a maximum of 5 relevant entities from it. Entities refer to key persons/organisations
  that are involved in the article. List all the entities separated by a comma on the same line.

  2. Determine if the text is relevant to the given category. Reply with "Yes" if it is
  relevant, "No" otherwise.
  
  Structure your reply as a JSON object with the properties below:
  "entities": "insert response from step 1",
  "relevant": "insert response from step 2"

  Reply only with the stringified JSON object such that it can be parsed immediately.

  Text: {input}, Category: {category}`
);

//Create Chains to call ChatGPT API
export const summaryChain = new LLMChain({ llm: model, prompt: summaryPrompt });
export const combineSummaryChain = new LLMChain({
  llm: model,
  prompt: combineSummaryPrompt,
});
export const allArticlesSummaryChain = new LLMChain({
  llm: model,
  prompt: allArticlesSummaryPrompt,
});
export const inferringChain = new LLMChain({ llm: model, prompt: inferringPrompt });
export const questionChain = new LLMChain ({llm:model,prompt: questionPrompt});
export const combineQuestionChain = new LLMChain({llm:model,prompt:combineQuestionPrompt});

//Create text splitter
export const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});


// export const updatePinecone = async (docs,embedID, questions, questionID ) => {
//     const chunks = [docs]
//     const embedding = await new OpenAIEmbeddings({openAIApiKey: API_KEY}).embedDocuments(chunks);
//    console.log(embedding)
// // 9. Create and upsert vectors in batches of 100
//       const vector = {
//         id: embedID,
//         values: embedding[0],
//       };
      
//      await pineconeIndex.upsert([vector]);

//      const q = [questions]
//      const qEmbedding = await new OpenAIEmbeddings({openAIApiKey: API_KEY}).embedDocuments(q);
//      console.log(qEmbedding)
//   // 9. Create and upsert vectors in batches of 100
//         const qVector = {
//           id: questionID,
//           values: qEmbedding[0],
//         };
        
//        await pineconeIndex.upsert([qVector]);
// };
