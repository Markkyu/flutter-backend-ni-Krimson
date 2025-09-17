const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "bi3yd1z0rgyargci4wot-mysql.services.clever-cloud.com", // localhost
  user: "unqtnu3enhuanmta", // root
  password: "4IqF0TRjwZTb8FXIzDrR", //
  database: "bi3yd1z0rgyargci4wot", // tododb
});

connection.connect();

// Server response when you open the app
app.get("/", (req, res) => {
  res.send("Hello from todo list backend app.");
});

// FETCHES all the todo item
app.get("/api/todo", (req, res) => {
  connection.query("SELECT * FROM todo_list", (err, rows, fields) => {
    if (err) throw err;

    res.json(rows);
  });
});

// ADD a todo item
app.post("/api/todo", (req, res) => {
  const todoItem = req.body.todo_item;

  connection.query(
    `INSERT INTO todo_list (todo_id, todo_item) VALUES (NULL, '${todoItem}')`,
    (err, rows, fields) => {
      if (err) throw err;

      res.json({ msg: `Successfully inserted!` });
    }
  );
});

// UPDATE a todo item
app.put("/api/todo", (req, res) => {
  const todoId = req.body.todo_id;
  const todoItem = req.body.todo_item;

  connection.query(
    `UPDATE todo_list SET todo_item = '${todoItem}' WHERE todo_id = '${todoId}'`,
    (err, rows, fields) => {
      if (err) throw err;

      res.json({ msg: `Successfully updated!` });
    }
  );
});

// DELETE a todo item
app.delete("/api/todo/", (req, res) => {
  const todoId = req.body.todo_id;

  connection.query(
    `DELETE FROM todo_list WHERE todo_id = '${todoId}'`,
    (err, rows, fields) => {
      if (err) throw err;

      res.json({ msg: `Successfully deleted!` });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
