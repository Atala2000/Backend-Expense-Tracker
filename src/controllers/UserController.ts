import { User } from '../models/models';
import { Request, Response } from "express";
import { saveModelData } from "../services/db.service";


const findUser = (req: Request, res: Response) => {
    const user = new User()
    const { email } = req.body;

    const userobject = User.find({email: email});

    if (userobject) {
        return res.status(200).json(userobject);
    } else {
        return res.status(500).json({"Error": "User could not be found"});
    }

}

const deleteUser = (req: Request, res: Response) => {
    const user = new User()

    const {email} = req.body;
    const result = User.findOneAndDelete({email: email});

    if (result) {
        res.status(200).json({"User deleted": result});
    }
        
}

const updateUser = () => {
    
}