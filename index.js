const express = require("express");
const app = express();

const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log(`Server is running at port 3000`);
});
