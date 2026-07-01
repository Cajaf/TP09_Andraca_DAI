import express  from "express"; 
import cors     from "cors"; 
import PublicacionRouter from "./src/controllers/publicacion-controller.js" 
import 'dotenv'
import verifyToken from "./src/helpers/jwt.js";
import dotenv from "dotenv";

dotenv.config();

const app  = express(); 
const port = process.env.DB_PORT || 3000;

app.use(cors()); 
app.use(express.json()); 


app.use("/api/publicacion", verifyToken ,PublicacionRouter);


const unknownEndpoint = (request, response) => {
    let jsonResponse = {
        "Error" : "unknown endpoint",
        "IP"    : request.ip,
        "Method": request.method,
        "Path"  : request.path,
        "Query" : request.query,
        "Body"  : request.body
    }
    response.status(404).send(jsonResponse)
}

app.use(unknownEndpoint)

app.listen(port, () => { 
    console.log(`Example app listening on port ${port}`) 
})