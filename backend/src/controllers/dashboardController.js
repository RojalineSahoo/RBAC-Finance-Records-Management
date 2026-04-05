import getDashboardSummaryService from "../services/dashboardServices.js";

const getDashboardSummaryController = async(req, res) => {
    try {
        const userId = req.headers.userid;
        const adminId = req.headers.adminid;

        const summary = await getDashboardSummaryService(userId, adminId);
        
        res.json(summary);
    } catch (err) {
        res.status(403).json({message: err.message})
    }
}

export default getDashboardSummaryController;