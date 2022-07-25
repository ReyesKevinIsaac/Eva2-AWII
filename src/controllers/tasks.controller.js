import { v4 } from "uuid";
import {getConnection} from "../database.js";

export const getTasks = (req,res)=>{
    const tasks = getConnection().data.tasks
    res.json(tasks)
}

export const createTask = async (req,res)=>{
    console.log(req.body)
    const newTask = {
        id:v4(),
        name: req.body.name,
        description: req.body.description
    }
    try {
        // throw new Error('No se encontro el archivo')
        const db = getConnection()
        db.data.tasks.push(newTask)
        await db.write() 

    res.json(newTask)
    } catch (error) {
        return res.status(500).send({message: error.message})         
    }
}

export const getTask = (req,res)=>{
    const taskFound = getConnection().data.tasks.find((task) => task.id === req.params.id)
    
    if(!taskFound) return res.sendStatus(404)
    res.json(taskFound)
}

export const updateTasks = async (req,res)=>{
    const db = getConnection()
    const taskFound = db.data.tasks.find((t)=> t.id === req.params.id)
    if(!taskFound) return res.sendStatus(404)

    taskFound.name = req.body.name
    taskFound.description = req.body.description

    db.data.tasks.map((t) => (t.id === req.params.id ? taskFound : t))

    await db.write()

    res.send(taskFound)
}

export const deleteTasks = async (req,res)=>{
    const db = getConnection()
    const taskFound = db.data.tasks.find((t)=> t.id === req.params.id)
    if(!taskFound) return res.sendStatus(404)

    const newTasks = db.data.tasks.filter(t => t.id !== req.params.id)
    db.data.tasks = newTasks

    await db.write()

    res.json(taskFound)
}

export const count = (req,res)=>{
    const totalTasks = getConnection().data.tasks.length
    res.json(totalTasks)
}