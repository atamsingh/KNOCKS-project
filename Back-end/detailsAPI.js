var restify = require('restify'), fs = require('fs');


function getBalance(req, res, next){
	fs.readFile('scorekeeper.txt', 'utf-8',function(err,data){
		res.json({
			type: true,
			data: data
		})
	});
}



function updateBalance(req, res, next){
	//console.log("update Entered");
	var getBalance = fs.readFileSync('scorekeeper.txt', 'utf-8');
	var currentBalance = parseInt(getBalance);
	var endOfLine = require('os').EOL;
	var changeToBalance = parseInt(req.params.amount);
	var mode = parseInt(req.params.mode);

	if(mode == 1){
		//console.log("reads for update2");
		var updatedBalance = currentBalance + changeToBalance;
		var toAddToFile = ""+req.params.date+"   "+req.params.detail+"   +"+changeToBalance+""+endOfLine;
		var toAddToBalanceFile = ""+updatedBalance;
		fs.appendFile('scoredetails.txt',toAddToFile);
		fs.writeFile('scorekeeper.txt',""+updatedBalance);
		res.json({
			type: true,
			data: parseInt(toAddToBalanceFile)
		})
	}else if (mode == 2){
		//console.log("reads for update2");
		var updatedBalance = currentBalance - changeToBalance;
		var toAddToFile = ""+req.params.date+"   "+req.params.detail+"   -"+changeToBalance+""+endOfLine;
		var toAddToBalanceFile = ""+updatedBalance;
		fs.appendFile('scoredetails.txt',toAddToFile);
		fs.writeFile('scorekeeper.txt',updatedBalance);
		res.json({
			type: true,
			data: updatedBalance
		})
	}else{
		res.json({
		type: false,
		data: "WRONG MODE param"
		})
	}
}


//SERVER CODE
var server = restify.createServer();

server.use(restify.fullResponse());
server.use(restify.queryParser({mapParams:true}));

server.get("/knocks", getBalance);
server.post("/knocks", updateBalance);

var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})
 
if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
   })
