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
        app.listen(4000, () =>{
            console.log('connected to MongoDB & listening to port', 4000,'!')
        })
    })
    .catch((error) =>{
        console.log(error)
    })


// Multer configuration
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.post("/pdfsummary", upload.single("prompt"), async(req,res)=>{
  const summary = await handlePdfSummary(req.file,req.body.subject, req.body.topic);
  res.send(summary);
})
app.listen(PORT, () => console.log("Your server is running on Port " + PORT));


const Schema = mongoose.Schema

const summarySchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    topic:{
        type: String,
        required:true
    },
    embedID:{
        type:String,
        required:true
    },
    questionID:{
      type:String,
      required:true
    }
})

const Summary = mongoose.model('Summary',summarySchema)

app.post("/summary", async(req,res) =>{
  const {subject,topic,embedID, questionID} = req.body
  try {
    const sum = await Summary.create({subject,topic,embedID, questionID})
    res.status(200).json(sum)
  }catch(error){
    res.status(400).json({error:error.message})
  }
})

app.get("/summary:id", async(req,res)=>{
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