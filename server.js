const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
app.use(express.json());
dotenv.config();

app.post("/login", (req,res)=>{
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let Data = {
    time: Date(),
    userId: 12,
  }
  const token = jwt.sign(Data, jwtSecretKey);
  res.status(200).json({ token });
});
app.post("/ver", (req,res)=> {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const poslaniToken =  req.body.token;
  const verifikacija = jwt.verify(poslaniToken, jwtSecretKey);
  if(verifikacija) {
    res.status(200).send("Uspijesno");
  }else {
    res.status(400).send("Nije uspijesno");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});