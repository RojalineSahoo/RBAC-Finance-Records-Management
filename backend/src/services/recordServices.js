import Record from '../models/record.js';
import User from '../models/user.js';

const createRecordService = async(userId, data) => {
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    if (user.role !== "admin") {
        throw new Error(`Only admin can create records and you are ${user.role}`);
    }

    if(!data.amount || data.amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    if(!['income', 'expense'].includes(data.type)) {
        throw new Error("Type must be either 'income' or 'expense'");
    }

    const record = await Record.create({...data, createdBy: userId});
    return record;
}

const getRecordService = async (userId, query) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "viewer") {
    throw new Error("Viewers cannot access the records.");
  }

  let filter = {
    isDeleted: false
  };

  if (user.role === "admin") {
    filter.createdBy = userId;
  }

  if (query.type) {
    filter.type = {
      $regex: query.type,
      $options: "i"
    };
  }

  if (query.category) {
    filter.category = {
      $regex: query.category,
      $options: "i"
    };
  }

  if (query.search) {
    filter.$or = [
      {
        category: {
          $regex: query.search,
          $options: "i"
        }
      },
      {
        type: {
          $regex: query.search,
          $options: "i"
        }
      }
    ];
  }


  let sortOption = {};

  if (query.sort === "amount") {
    sortOption.amount = -1; 
  }

  if (query.sort === "date") {
    sortOption.createdAt = -1; 
  }

  const records = await Record.find(filter).sort(sortOption);

  return records;
};



const deleteRecordService = async(userId, recordId) => {
    const user = await User.findById(userId);
    const record = await Record.findById(recordId);

    if(!user || user.role !== "admin") {
        throw new Error("Only admin can delete records.");
    }

    if (record.createdBy.toString() !== userId.toString()) {
        throw new Error("Unauthorized admin.");
    }

    const deletedRecord = await Record.findById(recordId);

    deletedRecord.isDeleted = true;
    
    await deletedRecord.save();

    return { message: "Record deleted successfully" };
}

const updateRecordService = async(userId, recordId, data) => {
    const user = await User.findById(userId);
    
    if(!user || user.role !== "admin") {
        throw new Error("Only admin can update records.");
    }

    const record = await Record.findById(recordId);

    if(!record) { throw new Error("Record is not present in the database.");}
    
    if (record.createdBy.toString() !== userId.toString()) {
        throw new Error("Not authorized to update this record");
    }

    return await Record.findByIdAndUpdate(recordId, data, {new: true});
}

export {createRecordService, getRecordService, updateRecordService, deleteRecordService};