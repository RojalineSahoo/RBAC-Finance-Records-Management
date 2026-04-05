import { getAllUserService, createNewUserService } from "../services/userServices.js";

const getAllUserController = async(req, res) => {
    try {
        const requesterId = req.headers.userid;

        const allUsers = await getAllUserService(requesterId);
        
        res.json(allUsers);
    } catch (err) {
        res.status(403).json({message: err.message});
    }
}

const createNewUserController = async(req, res) => {
    try {
        const newUser = await createNewUserService(req.body);
        
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

export { getAllUserController, createNewUserController };