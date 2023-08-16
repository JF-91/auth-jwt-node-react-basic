
import app from "./app.js";
import { connectDB } from "./db.js";

let port = process.env.PORT

connectDB();
app.listen(process.env.PORT, ()=>console.log(`server run in port ${port}`));
