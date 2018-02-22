var fs=require('fs');
var express=require('express');
var app=express();
app.use(express.static(__dirname));
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.get('/',function(req,res){
	res.sendFile(__dirname+'/main.html')
})
app.get('/getajax',function(req,res){
	console.log(req.query);
	//res.send('success');
	var p1=!isNaN(req.query.username);
	console.log(p1)
	var p2=!isNaN(req.query.password)
	console.log(p2)
	if (p1&&p2){
		var result=+req.query.username+ +req.query.password ;
		res.send(result+'');
	}
	else res.send('Введіть числа')

});
		app.post('/postajax',function(req,res){
	console.log(req.body);
	res.send("test");
})
app.get('/getfile',function(req,res){
	fs.readFile('data.json','utf-8',function(err,data){
		if(err)
			console.error(err);
		else
			res.send(data);
	})
})
app.post('/adduser',function(req,res){
	console.log(req.body);
	var user=req.body;
	fs.readFile('data.json','utf-8',function(err,data){
		if(err)
			console.error(err)
		else{
			data=JSON.parse(data);
			data.push(user);
			data=JSON.stringify(data);
			fs.writeFile('data.json',data);
		}
		res.send('adduser');
	})
})
	
app.post('/rowindex',function(req,res){
	console.log(req.body);
	fs.readFile('data.json','utf-8',function(err,data){
		if(err) console.error(err);
		data=JSON.parse(data)
		data.splice(req.body.index,1);
		data=JSON.stringify(data);
		fs.writeFile('data.json',data);
	})
	res.send('deleteuser')
})


app.listen(8080);
console.log('Run Server!');