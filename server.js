const express = require("express");
const app = express();
const jobRoute = require("./routes/jobRoute");
const userRoute = require("./routes/userRoute");
const applicantRoute = require("./routes/applicantRoute");
const dotenv = require("dotenv");
const cors = require('cors')
const fileUpload = require("express-fileupload");


dotenv.config({ path: "./config.env" });

require("./db/db");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/api", jobRoute);
app.use("/api", userRoute);
app.use("/api", applicantRoute);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.get('/',(req,res)=>{
  res.send('Server Started...')
  })

app.listen(port, () => {
  console.log("Server Started");
});
