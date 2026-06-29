import express  from "express"; 
import cors     from "cors"; 
import PublicacionRouter from "./src/controllers/publicacion-controller.js" 
import 'dotenv'

const app  = express(); 
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 


app.use("/api/publicacion", PublicacionRouter); 


app.listen(port, () => { 
    console.log(`Example app listening on port ${port}`) 
})