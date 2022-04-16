import express from "express";
const app = express();
import { getReviews } from "../controllers/getReviewsController.js";

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();



app.post("/getReviews", jsonParser, getReviews);

const port = 8080;
app.listen(port, ()=>{
    console.log("Server is running at ", port);
});