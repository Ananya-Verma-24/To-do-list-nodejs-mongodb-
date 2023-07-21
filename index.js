// -------------------------- import express----------------------
const express = require('express');
const path = require('path');


//----------------------------assign port---------------------------------
const port = 3000;



// ----------------------import connection fie of mongoose ----------------------
const db = require('./config/mongoose');




// -------------------------import the file for saving data in database----------
const Todo = require('../to_do_list/models/todo');



// ---------------taking all the functionalities of express in app--------------------------
const app = express();




// ---------------------------setting up the ejs engine-----------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//-------------------- middleware for reading forms data-----------------------------
app.use(express.urlencoded());




// ------------------------importing assets folder-------------------------------------
app.use(express.static('assets'));




// ------------------------render home page--------------------------
app.get('/', function (req, res) {

    Todo.find({}).then(function (tasks) {

        return res.render('home', {
            title: "My To Do List",
            task_list: tasks
        });

    })
        .catch(function (err) {
            console.log(err);
        });
});


//------------------------- adding task------------------------------
app.post('/create-todo', function (req, res) {

    Todo.create({
        task: req.body.task,
        category: req.body.category,
        deadline: req.body.deadline
    });
    return res.redirect('/');

});

// ------------------------ deleting task-------------------------------
app.post('/delete-task', function (req, res) {
    let id = req.body;
    console.log(id);

    let checkboxs = Object.keys(id).length;

    for (let i = 0; i < checkboxs; i++) {
        Todo.findByIdAndDelete(Object.keys(id)[i])
            .then(() => {
                return res.redirect('back');
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });

    }

});



// --------------------------------to run the server--------------------------------
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`My server is running successfully on port: ${port}`);


});