module.exports = (success, error) => {
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://localhost:27017/projects")
    mongoose.connection.once("open", () => {
        success()
    })
    mongoose.connection.once("err", () => {
        error()
    })
}