const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const db = require("./db/db")
const history = require("connect-history-api-fallback")

db(() => {
    const app = express()
    const ProjectsSchema = new mongoose.Schema({
        name: String,
        description: String,
        author: String,
        lang: String
    })
    const Projects = mongoose.model("projects", ProjectsSchema)

    app.use(history())
    app.use(express.static("static"))
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "static/index.html"))
    })
    app.get("/api/getProjects/all", async (req, res) => {
        try {
            const projectList = await Projects.find().lean().exec()
            res.json(projectList)
        } catch (err) {
            res.status(500).json({msg: "服务器错误"})
        }
    })
    app.use((req, res) => {
        res.status(404)
        res.send("<h1>你的页面被我吃啦(^_^)</h1>")
    });
    app.listen(8080, () => {
        console.log("http://localhost:8080")
    })
}, () => {
    console.log("连接失败")
})
