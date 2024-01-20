//Import server dependencies
import express from "express";
import multer from "multer";
import cors from "cors";
import { handlePdfSummary } from "./lib.js";
import "dotenv/config";
import mongoose from "mongoose";
//Set up Express.js server
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        // listen for requests
        app.listen(PORT, () =>{
            console.log('connected to MongoDB & listening to port', PORT,'!')
        })
    })
    .catch((error) =>{
        console.log(error)
    })


// Multer configuration
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.post("/pdfsummary", upload.single("prompt"), async(req,res)=>{
  const module = req.body.module
  const subject = req.body.subject
  const topic = req.body.topic
  const {sumText,questionText} = await handlePdfSummary(req.file,req.body.subject, req.body.topic);
  console.log(sumText)
  const summary = await Summary.create({module,subject,topic,sumText, questionText})
res.status(200).send(summary)
})

const Schema = mongoose.Schema

const summarySchema = new Schema({
    module:{
        type:String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    topic:{
        type: String,
        required:true
    },
    sumText:{
      type: String,
      required: true
    },
    questionText:{
      type: String,
      required:true
    }
})


const Summary = mongoose.model('Summary',summarySchema)


app.get("/pdfsummary", async(req,res) =>{
  const summaries = await Summary.find({}).sort({createdAt: -1})

  res.status(200).json(summaries)
})

app.get("/pdfsummary/:id", async(req,res)=>{
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such entry"})
}
const sum = await Summary.findById(id)
if (!sum){
    return res.status(400).json({error: "No such entry"})
}

res.status(200).json(sum)
})

