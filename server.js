var express = require('express'),
    app = express();

var port = 3000;


app.use(express.static('/home/yatindra/bootcamp/ToDoApp/app/'));
app.use(express.static('/home/yatindra/bootcamp/ToDoApp/api/'));

app.listen(port,function () {
        console.log("App is running at port: ",port);
    });
