const express = require("express");
// const config = require("config");
const path = require("path");
// const mongoose = require("mongoose");
// const authRoute = require("./routes/authRoute");
// const linkRoute = require("./routes/linkRoute");
// const redirectRoute = require("./routes/redirectRoute");

// const PORT = config.get("port") || 5000;
const PORT = process.env.PORT || 5000;

const app = express();

// app.use(express.json({ extended: true })); //подкл. мидлвар для корректного парсинга req.body-это stream obj

// app.use("/api/auth", authRoute);
// app.use("/api/link", linkRoute);
// app.use("/t", redirectRoute);

// if (process.env.NODE_ENV === "production") {
app.use("/", express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }

// app.get("/", function(req, res) {
//   res.send(`<h1>Main page</h1><p>Port: ${PORT}</p>`);
// });

app.listen(PORT, () => console.log("Start on port:", PORT));
// mongoose // подключение mongoBD
//   .connect(config.get("mongoUri"), {
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useNewUrlParser: true
//   })
//   .then(() => app.listen(PORT, () => console.log("Start on port:", PORT)))
//   .catch(e => {
//     console.log("Promise failed: ", e);
//     process.exit(1);
//   });
