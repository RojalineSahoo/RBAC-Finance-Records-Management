import Record from "../models/record.js";
import User from  "../models/user.js";

import {createRecordService, getRecordService, deleteRecordService, updateRecordService} from "../services/recordServices.js";

const createRecordController = async(req, res) => {
    try {
        const userId = req.headers.userid;

        const record = await createRecordService(userId, req.body);
        res.status(201).json(record);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

const getRecordController = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const records = await getRecordService(userId, req.query);

    res.json(records);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteRecordController = async(req, res) => {
    try {
        const userId = req.headers.userid;
        const recordId = req.params.id;

        const deleteResponse = await deleteRecordService(userId, recordId);
        res.status(200).json(deleteResponse);
    } catch (err){
        res.status(403).json({message: err.message });
    }
}

const updateRecordController = async(req, res) => {
    try {
        const userId = req.headers.userid;
        const recordId = req.params.id;

        const updateResponse = await updateRecordService(userId, recordId, req.body);
        
        res.status(200).json(updateResponse);
    } catch (err) {
        res.status(403).json({message: err.message});
    }
}

export {createRecordController, getRecordController, deleteRecordController, updateRecordController};