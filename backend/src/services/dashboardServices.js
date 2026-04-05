import Record from "../models/record.js";
import User from "../models/user.js";

const getDashboardSummaryService = async(userId, adminId = null) => {
    const user = await User.findById(userId);

    if(!user) throw new Error("Invalid UserId");
    
    let allRecords = {};

    if(user.role === "admin") {
        allRecords = await Record.find({
            createdBy: userId,
            isDeleted: false
        });
    }

    else if(user.role === "analyst") {
        allRecords = await Record.find({
            isDeleted: false
        })
    }

    else if(user.role === "viewer") {
        const admin = await User.findById(adminId);

        if(!admin || admin.role !== "admin") {
            throw new Error("Invalid adminId or admin is not present.");
        }

        allRecords = await Record.find({
            createdBy: adminId,
            isDeleted: false
        })
    }

    let totalIncome = 0;
    let totalExpense = 0;
    let highestAmountCategory = null;
    let highestAmount = 0;

    let categoryWiseSpend = {}

    allRecords.forEach((record) => {
        if(record.type == 'income') {
            totalIncome += record.amount
        }
        if(record.type == 'expense') {  
            totalExpense += record.amount;
        }
        
        if(!categoryWiseSpend[record.category]) {
            categoryWiseSpend[record.category] = 0
        }
    
        categoryWiseSpend[record.category] += record.amount;
    })

    let netBalance = totalIncome - totalExpense 

    for(const category in categoryWiseSpend) {
        if(category.type === "income")
        {
            continue;
        }
        else
        {
            if(categoryWiseSpend[category] > highestAmount) {
            highestAmount = categoryWiseSpend[category];
            highestAmountCategory = category;
        }
        }
    }

    return {
        totalIncome,
        totalExpense,
        netBalance,
        categoryWiseSpend,
        highestAmountCategory
    }
}

export default getDashboardSummaryService;