const { response } = require("express");
const express = require("express");
const server = express();

server.use(express.json());

let custumers = [
  {
    id: 1,
    name: "Dev Washiner",
    site: "https://washiner.github.io/portifolio/",
  },
  { id: 2, name: "Google", site: "https://www.google.com" },
  { id: 3, name: "Uol", site: "https://uol.com.br" },
];

server.get("/custumers", (require, response) => {
  return response.json(custumers)
});

server.get("/custumers/:id", (require, response) => {
     const id = parseInt(require.params.id)        
     const customer = custumers.find(item => item.id === id)   
     const status = customer ? 200 : 404

    return response.status(status).json(customer)
  });

  server.post("/custumers", (require, response) => {

    const {name, site} = require.body
    const id = custumers[custumers.length -1].id + 1

    const newCustomer = {id, name, site}
    custumers.push(newCustomer)

    return response.status(201).json(newCustomer)

  })

    server.put("/custumers/:id", (require, response) => {
        const id = parseInt(require.params.id)
        const {name, site} = require.body

        const index = custumers.findIndex(item => item.id === id)
        const status = index >= 0 ? 200 : 404

        if(index >= 0) {
            custumers[index] = {id: parseInt(id), name, site}
        }
        return response.status(status).json(custumers[index])
    })

    server.delete("/custumers/:id", (require, response) => {
        const id = parseInt(require.params.id)
        const index = custumers.findIndex(item => item.id === id)
        const status = index >= 0 ? 200 : 404

        if(index >= 0){
            custumers.splice(index, 1)
        }

        return response.status(status).json()

        
    })

server.listen(3000);
