var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/todo';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/todos', function(req, res){
	var results = [];
	var data = {text: req.body.text, complete: false};
				

	pg.connect(connectionString, function(err, client, done){
		if(err) {
			done();
			console.log(err);
			return res.status(500).json({success:false, data: err});
		}

		client.query("INSERT INTO items(text, complete) values($1, $2);", [data.text, data.complete]);

		var query = client.query('SELECT * FROM items ORDER BY id ASC;');
		query.on('row', function(row){
			results.push(row);
		});

		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

router.get('/todos', function(req, res){
	var results = [];

	pg.connect(connectionString, function(err, client, done){

		if (err){
			done();
			console.log(res.status(500).json({success: false, data:err}));
		}

		var query = client.query("SELECT * FROM items ORDER BY id ASC;");

		query.on('row', function(row){
			results.push(row);
		});

		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

router.delete('/todos/:todo_id', function(req, res){

	var results = [];

	var id = req.params.todo_id;
	pg.connect(connectionString, function(err, client, done){

		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}

		var query = client.query("DELETE FROM items WHERE id=($1)", [id]);
		
		query.on('row', function(row){
			results.push(row);
		});

		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

router.put('/todos/:todo_id', function(req, res){

	var results=[];
	var id = req.params.todo_id;

	var data = {text: req.body.text,complete: req.body.complete};

	pg.connect(connectionString, function(err, client, done){
		if (err){
			done();
			console.log(err);
			return res.status(500).send(json({success: false, data:err}));
		}

		client.query("UPDATE items SET text=($1), complete($2) WHERE id=($3)", [data.text, data.complete, id]);

		var query = client.query("SELECT * FROM items ORDER BY id ASC");

		query.on('row', function(row){
			results.push(row);
		});

		query.on('end', function(){
			done();
			return res.json(results);
		});
	})
})
module.exports = router;
