var express = require("express"),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/cocktail');
app.use(bodyParser.json())

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});

var ingredientSchema = mongoose.Schema({
	name: String,
	have: Boolean
});

var cocktailSchema = mongoose.Schema({
	name: String,
	ingredients: [{name: String, amount: String}],
	description: String,
	prep: String
})

var Ingredient = mongoose.model('Ingredient', ingredientSchema);
var Cocktail = mongoose.model('Cocktail',cocktailSchema);

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

app.post("/api/create_cocktail",function(req,res){
	data = req.body

	var new_cocktail = new Cocktail({
		name: data.name,
		description: data.description,
		prep: data.prep,
		ingredients: data.ingredients
	});
	new_cocktail.save(function (err, new_cocktail){
		if (err) return console.error(err);
		res.send("Added " + new_cocktail.name)
	});
});

app.get("/api/cocktails", function(req,res){
	Cocktail.find(function (err, cocktails) {
  		if (err) return console.error(err);
  		res.send(cocktails);
	});
})

app.get("/api/ready_cocktails", function(req, res){
	Ingredient.find({have:true}, function(err, ingredients){
		var ingredient_names = [];
		for (i in ingredients){
			ingredient_names.push(ingredients[i].name)
		}
		output = []
		if (err) return console.error(err);
		Cocktail.find(function (err, cocktails){
			for (var i = 0; i<cocktails.length; i++){
				console.log(cocktails[i])
				var add = true;
				for (j = 0; j < cocktails[i].ingredients.length; j++){
					if (!(ingredient_names.indexOf(cocktails[i].ingredients[j].name) >= 0)){
						add = false; 
					}
				}
				if (add){
					output.push(cocktails[i]);
				}
			}
			console.log(output)
			res.send(output)
		});
	});
});

app.get("/api/ingredients",function(req, res){
	Ingredient.find(function (err, ingredients) {
  		if (err) return console.error(err);
  		res.send(ingredients);
	});
});

app.get("/cocktail",function(req,res){
	res.sendFile(__dirname + "/client/views/cocktail.html");
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