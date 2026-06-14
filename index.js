// Importa o Express — framework para criar servidores e APIs em Node.js
const express = require("express");

const Task = require("./Task");

require("dotenv").config();
const mongoose = require("mongoose");

// Cria uma instância da aplicação Express
const app = express();

// Middleware — converte o body dos pedidos de JSON para objeto JavaScript
// Tem de estar antes de todas as rotas
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Ligado ao MongoDB"))
  .catch((err) => console.log("Error:", err));

// GET / — rota raiz, confirma que o servidor está a funcionar
app.get("/", (req, res) => {
  res.send("Servidor a funcionar!");
});

// GET /tasks — devolve todas as tarefas em JSON
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const findTask = await Task.findById(req.params.id);
    if (findTask != null) {
      res.status(200).json(findTask);
    } else {
      res.status(404).json({ message: "Tarefa não encontrada" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks — cria uma nova tarefa
// Os dados da nova tarefa vêm no body do pedido (req.body)
app.post("/tasks", async (req, res) => {
  try {
    if (typeof req.body.title !== "string" || req.body.title.trim() === "") {
      return res.status(400).json({ message: "Titulo tem que conter texto" });
    }
    const task = new Task({
      title: req.body.title,
      completed: req.body.completed || false,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// PUT /tasks/:id — atualiza a tarefa com o id especificado
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTask != null) {
      res.status(200).json(updatedTask);
    } else {
      res
        .status(404)
        .json({ message: "Tarefa não foi atualizada, ID não existe" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /tasks/:id — apaga a tarefa com o id especificado
// :id é um parâmetro dinâmico — acessível via req.params.id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (deleteTask != null) {
      res.status(200).json({ message: "Tarefa apagada" });
    } else {
      res
        .status(404)
        .json({ message: "Tarefa não existe, não pode ser apagada" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor a correr na porta 3000");
});
