const express = require('express');

const fs = require('fs');
const mustache = require('mustache');
let app = express();
//let db = ["Toto", "Tata", "Titi", "Tutu", "John"];
let db = [{
        name: "Dj Bouf",
        place: "Dofus"
    },
    {
        name: "Dj Frifri",
        place: "Dofus 2.0"
    },
    {
        name: "Dj Sacri",
        place: "Sacri Temple"
    }
];

app.get("/", function(req, res) {
    res.render('index', {
        events: db
    });
})

/*app.get("/", function(req, res) {
    res.render('index', {
        name: 'Cyrille',
        adjective: 'Amazing',
        nameList: db
    });
})*/
app.get("/test", function(req, res) {
        let str = mustache.render("Hello {{name}}!!", {
            name: "Cyrille",
        });
        res.send(str);
    })
    /*app.get("/array.html", function(req, res) {
        let str = mustache.render("Hello {{.array}} !", {
            array: db
        });
        res.send(str);
    })

    app.engine("html", function(path, options, callback) {
        fs.readFile(path, function(err, content) {
            if (err) {
                return callback(err);
            }
            let arr = mustache.render(content.toJSON(), options);
            return callback(null, arr);
        });
    });
    */


app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    });
});
app.set('views', './template');
app.set('view engine', 'html');
app.use("/", express.static("public"));
/*app.use(function(req, res) {
    res.send("Yo ! ");
});*/
app.listen(80, "localhost", function() {
    console.log('Listening port 80 !');
})