require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ejs = require("ejs");

const { CustomError, asyncRouteHandler, errorHandler, interceptor } = require('./utils/router-utils');
const userRoutes = require("./routes/user-routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(interceptor);



app.use("/", userRoutes);

app.all('*', (req, res, next) => {
	next({ message: 'Invalid Route', stack: 'app.js' });
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
