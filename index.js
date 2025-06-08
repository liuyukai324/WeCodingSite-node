const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const db = require("./db/db")

db(() => {
    const app = express()
    const ProjectsSchema = new mongoose.Schema({
        name: String,
        cover: Array,
        description: String,
        author: String,
        lang: String
    })
    const Projects = mongoose.model("projects", ProjectsSchema)
    app.use(express.static("static"))
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "static/index.html"))
    })
    app.get("/api/getProjects/:lang", async (req, res) => {
        const lang = req.params.lang
        if (lang === "all") {
            try {
                const projectList = await Projects.find().lean().exec()
                res.json(projectList)
            } catch (err) {
                res.status(500).json({msg: "服务器错误"})
            }
        } else {
            try {
                const projectList = await Projects.find({lang: lang}).lean().exec()
                res.json(projectList)
            } catch (err) {
                res.status(500).json({msg: "服务器错误"})
            }
        }
    })

    app.listen(8080, () => {
        console.log("http://localhost:8080")
    })
}, () => {
    console.log("连接失败")
})
