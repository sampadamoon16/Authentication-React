
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const salt = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ error: "Token is not valid" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ status: "success", name: req.name });
});


app.post("/register", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?,?,?)";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err)
      return res.json({ error: "Error for hashing password" });

    const values = [req.body.name, req.body.email, hash];
    db.query(sql, values, (err, result) => {
      if (err) return res.json({ err });
      return res.json({ status: "success" });
    });
  });
});


app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? ";
  db.query(sql, [req.body.email], (err, data) => {
    console.log(req.body.email)
    if (err) return res.json({ error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare
        (req.body.password.toString(), data[0].password, (err, response) => {
          if (err) return res.json({ error: "Password compare error" });
          if (response) {
            const name = data[0].name;
            const token = jwt.sign({ name }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' }); // Change the expiration as needed
            res.cookie('token', token);
            return res.json({ status: "success" });
          } else {
            return res.json({ error: "Password not matched" });
          }
        });
    } else {
      return res.json({ error: "No email exists" });
    }
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: "success" });
});

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(" Port Running on 8081.....");
});