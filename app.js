const express = require('express');
const mysql = require('mysql');

// Create Connection

const db = mysql.createConnection({
    host      :  'localhost',
    user      :  'root',
    password  : '',
    database  : 'nodemysql'
});


//Connect
db.connect((err) => {
    if (err) {
        throw err;
    } console.log('mysql connected..')
});

const app = express();

//Create DB

app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created..');

    });
});

//Create table

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, resulr) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });

});

//Insert post1

app.get('/addpost1', (req,res) => {
    let post = {title: 'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 1 added...');

    });
});


//Insert post2

app.get('/addpost2', (req,res) => {
    let post = {title: 'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 2 added...');

    });
});


//Select posts

app.get('/getposts', (req,res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched...');

    });
});

//Select single post
app.get('/getpost/:id', (req,res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched...');

    });
});

//Update post
app.get('/updatepost/:id', (req,res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts updated...');

    });
});

//Delete post
app.get('/deletepost/:id', (req,res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts deleted...');

    });
});






app.listen(3000, () => {
    console.log('App listening on port 3000!');
});