import express from 'express';
import router from "./Routes/router.js";

const app = express();
const port = 8000;

app.use(express.json())
app.use('/',router);

app.listen(port, () => {
    console.log("server is running port no :" + port);
})