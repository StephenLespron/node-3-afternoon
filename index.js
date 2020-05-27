require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  app = express(),
  ctrl = require("./products_controller"),
  { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.get(`/api/products`, ctrl.getAll);
app.get(`/api/products/:id`, ctrl.getOne);
app.put(`/api/products/:id`, ctrl.update);
app.post(`/api/products`, ctrl.create);
app.delete(`/api/products/:id`, ctrl.delete);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
