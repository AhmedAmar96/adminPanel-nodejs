const findService = async (model, skip, limit, searchKey, fields) => {
    try {
        let data;
        if (searchKey) {
            const columns = [...fields.map((field) => {
                return { [field]: { $regex: searchKey } }
            })];
            data = await model.find({
                $and: [
                    { $or: columns },
                    { role: "admin" }
                ]
            }).skip(skip).limit(limit).select("username email location role");
        } else {
            data = await model.find({ role: "admin" }).skip(skip).limit(limit).select("username email location role");
        }
        return data;

    } catch (error) {
        return error;
    }
}

module.exports = findService;