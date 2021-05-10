const express = require("express");
const path = require("path");

const router = require("./routes/rute1");
const r = require("./routes/rute1");

const app = express();

app.use(express.json());
app.use(router);
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
})


app.listen(3000, () => {
    console.log('serverul ruleaza pe portul 3000');
});
