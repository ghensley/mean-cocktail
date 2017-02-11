var express = require("express"),
	app = express(),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cocktail');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});

var ingredientSchema = mongoose.Schema({
	name: String,
	have: Boolean
});
var Ingredient = mongoose.model('Ingredient', ingredientSchema);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/client/views/index.html");
});

app.get("/api/make_ingredient/:name", function(req, res){
	var new_ingredient = new Ingredient({name: req.params.name, have: false});
	console.log("Made Ingredient: "+ new_ingredient)

	new_ingredient.save(function (err, new_ingredient) {
  		if (err) return console.error(err);
  		res.send("Added " + new_ingredient.name);
	}); 
});

app.get("/api/ingredients",function(req, res){
	Ingredient.find(function (err, ingredients) {
  		if (err) return console.error(err);
  		res.send(ingredients);
	});
});

app.get("/api/update_availability/:id/:status",function(req,res){

	Ingredient.update({ _id: req.params.id }, { $set: { have: req.params.status }}, function(err){
		if (err) return console.error(err);
  		res.send("ok");
	});
});

app.use(express.static('client'))

app.listen(3000, function(){
	console.log("Server started...")
});