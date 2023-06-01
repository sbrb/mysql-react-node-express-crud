import express from 'express';
const router = new express.Router();
import conn from "../db/conn.js";


// register user
router.post("/create", (req, res) => {
    try {
        const date = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');


        const { name} = req.body;
        if (!name) {
            res.status(422).json("Please Fill The all Field.");
        }
 
        conn.query("SELECT * FROM students ", (err, result) => {
            conn.query("INSERT INTO students SET ?", { name, datetime: date }, (err, result) => {
                if (err) {
                    console.log("err" + err);
                } else {
                    res.status(201).json(req.body);
                }
            })
        })
    } catch (err) {
        res.status(422).json(err);
    }
});


// get all user 
router.get("/getusers", (req, res) => {
    try {
        conn.query("SELECT * FROM students", (err, result) => {
            if (err) {
                res.status(422).json("No Data Available");
            } else {
                res.status(201).json(result);
            }
        })
    } catch (err) {
        res.status(422).json(err);
    }
});


// update user
router.patch("/updateuser/:id", (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        conn.query("UPDATE students SET ? WHERE id = ? ", [data, id], (err, result) => {
            if (err) {
                res.status(422).json({ message: "error" });
            } else {
                res.status(201).json(result);
            }
        })
    } catch (err) {
        res.status(422).json(err);
    }
});


// delete user
router.delete("/deleteuser/:id", (req, res) => {
    try {
        const { id } = req.params;
        conn.query("DELETE FROM students WHERE id = ? ", id, (err, result) => {
            if (err) {
                res.status(422).json("error");
            } else {
                res.status(201).json(result);
            }
        })
    } catch (err) {
        res.status(422).json(err);
    }
});

export default router;
