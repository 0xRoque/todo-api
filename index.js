// Importa o Express — framework para criar servidores e APIs em Node.js
const express = require("express");

// Cria uma instância da aplicação Express
const app = express();

// Middleware — converte o body dos pedidos de JSON para objeto JavaScript
// Tem de estar antes de todas as rotas
app.use(express.json());

// Array em memória que simula uma base de dados
// Em produção isto seria substituído por uma base de dados real (MongoDB, PostgreSQL)
let tasks = [
  { id: 1, title: "Estudar Node.js", completed: false },
  { id: 2, title: "Fazer Exercicio", completed: true },
  { id: 3, title: "Ler Livro", completed: false },
];

// GET / — rota raiz, confirma que o servidor está a funcionar
app.get("/", (req, res) => {
  res.send("Servidor a funcionar!");
});

// GET /tasks — devolve todas as tarefas em JSON
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks — cria uma nova tarefa
// Os dados da nova tarefa vêm no body do pedido (req.body)
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,   // gera um id incremental
    title: req.body.title,  // título vem do body
    completed: false,        // nova tarefa começa sempre por fazer
  };
  tasks.push(newTask);               // adiciona ao array
  res.status(201).json(newTask);     // 201 Created — devolve a tarefa criada
});

// DELETE /tasks/:id — apaga a tarefa com o id especificado
// :id é um parâmetro dinâmico — acessível via req.params.id
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  // filter mantém todas as tarefas EXCETO a que tem o id recebido
  // Number() converte o id de string para número para comparação correta
  tasks = tasks.filter((element) => element.id !== Number(id));
  res.status(200).json({ message: "Tarefa apagada!" });
});

// PUT /tasks/:id — atualiza a tarefa com o id especificado
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  // find devolve a tarefa encontrada — um objeto, não um array
  const task = tasks.find((element) => element.id === Number(id));
  // atualiza o título — se não vier no body, mantém o atual
  task.title = req.body.title || task.title;
  // atualiza o completed — verifica undefined porque false é um valor válido
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  res.status(200).json({ message: "Tarefa atualizada" });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor a correr na porta 3000");
});