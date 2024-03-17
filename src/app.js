const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { main, disconnectPrisma } = require('./lib/prismaOperation');
const routes = require("./api/routes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const corsConfig = {
  origin: "*",
  Credential: true,
  method: [
    "GET", "POST", "PUT", "DELETE", "PATCH"
  ]
}

app.options("", cors(corsConfig));
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

// const swaggerUiOptions = {
//   explorer: true,
// };

// app.use(
//   "/api-docs",
//   swaggerUI.serve,
//   swaggerUI.setup(swaggerDocs, swaggerUiOptions)
// );

app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`);

  try {
    await main();
  } catch (error) {
    console.error('Error running Prisma operations:', error);
    await disconnectPrisma();
    process.exit(1);
  }
});
