const Log = require('./Login')
const mconnect = require('./db')
const nodemailer = require("nodemailer");
const express = require('express');
const cors = require('cors');
const dy = require('body-parser');
const app = express();
const PORT = 800 // process.env.PORT || ;



mconnect();

// app.use(cp());
app.use(cors());
app.use(dy.json());
app.use(dy.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Hello");
});



app.post('/send', async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const no = req.body.no;

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "ravigupta77389@gmail.com",
                pass: "bpuu hqhn lxor mibr",
            },
        });

        let info = await transporter.sendMail({
            from: "ravigupta77389@gmail.com", // sender address
            to: "ravigupta77389@gmail.com", // list of receivers
            subject: `${name}`, // Subject line
            text: "Hello world?", // plain text body
            html: `<b>I want to connect to you . Contact me on ${no} . My emal id is  : ${email}</b>`, // html body 
        })

        // console.log("Message sent: %s", info.messageId);
        res.json(info);
        res.send("Mail Sended");
    } catch (error) {
        console.log('error');
    }


});

app.post('/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;
    const user = await Log.findOne({ email });
    if (user) {
        res.json("user already exist");
    }
    else {
        // const hashPassword = await bcrypt.hash(password , salt ) ;
        const new_user = new Log({ name, email, feedback });
        await new_user.save();   // save data to mongo db
        return res.json({ Status: "Success" });
    }
});



app.get('/getfeedback', async (req, res) => {
    const f = await Log.find({});    // finding all  data from mongo db like (select * in mysql)
    res.json(f);
    // res.send("Hello") ;
});



app.post('/ans', (req, res) => {
    const array = req.body.array;
    // console.log(array) ;    

    if (suduko_solver(array)) {
        // console.log("error") ;
        res.send(array);
    }

})



app.get('/ans', (req, res) => {
    const array = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    // console.log(array) ;    

    if (suduko_solver(array)) {
        // console.log("error") ;
        res.send(array);
    }

})

app.listen(PORT, () => {
    console.log('app started successsfuly');
}) 
