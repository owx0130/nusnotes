//Import dependencies

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { updatePinecone } from "./llm-requirements.js";

import {
  summaryChain,
  combineSummaryChain,
  questionChain,
  combineQuestionChain,
  splitter,
} from "./llm-requirements.js";


async function convertPDFtoDoc(pdf) {
  const loader = new PDFLoader(pdf, {
    splitPages: false,
  });
  const docs = await loader.parse(pdf.buffer,{});
  return docs;
}

export async function handlePdfSummary(pdf, title, topic){
try{
  const pdfParsed = await convertPDFtoDoc(pdf);
  //Split the document into chunks
  const split_docs = await splitter.splitDocuments(pdfParsed);
  //Concurrently summarise every chunk with ChatGPT
  console.log("split")
  const res = await Promise.all(
    split_docs.map(async (item) => {
      return summaryChain.call({ input: item.pageContent, subject:title,topic:topic });
    }),
  );
  console.log("res")
  const qn = await Promise.all(
  split_docs.map(async (item) => {
    return questionChain.call({ input: item.pageContent, subject:title,topic:topic });
  }))
    //Consolidate all summarised chunks into one paragraph
  const summary = await combineSummaryChain.call({
    input: res.map((item) => item.text),
    subject: title,
    topic: topic,
  });
  const questions = await combineQuestionChain.call({
    input: qn.map((item)=>item.text),
    subject: title,
    topic: topic,
  })
  // const embedID = `${title}-${topic}`
  // const questionID = `question-${embedID}`
  //await updatePinecone(summary.text,embedID,questions.text, questionID)
const sumText = summary.text
const questionText = questions.text
// console.log(sumText);
// console.log(questionText)
return {sumText,questionText};
}

catch(error){
  console.error("error loading pdf", error)
  throw(error);
}
}
