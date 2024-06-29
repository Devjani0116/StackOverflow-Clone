import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import answerRoutes from './routes/Answers.js';
import questionRoutes from './routes/Questions.js';
import userRoutes from "./routes/users.js";

const app =express();
dotenv.config();
app.use(express.json({limit:"30mb",extended: true}))
app.use(express.urlencoded({limit:"30mb",extended: true}))
app.use(cors());
app.get('/',(req,res) => {
    res.send("This is a stack overflow clone")

})
app.use(cors({
    origin: 'https://stackoverflow-productions1.netlify.app/',
    credentials: true
}));
 app.use('/user',userRoutes)
 app.use('/questions',questionRoutes)
 app.use('/answer',answerRoutes)
const PORT =process.env.PORT || 5000
const CONNECTION_URL="mongodb+srv://Devjani_025:NDmaity_01256@stack-overflow-clone.1zhlazc.mongodb.net/?retryWrites=true&w=majority&appName=stack-overflow-clone"
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err)=> console.log(err.message))

