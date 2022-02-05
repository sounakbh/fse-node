import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
mongoose.connect('mongodb+srv://sounak:newpassword@cluster0.rfwrs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(_ => console.log("Connected Successfully!"));
const app = express();
app.use(bodyParser.json())

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);