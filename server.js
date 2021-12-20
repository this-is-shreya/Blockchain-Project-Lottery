const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
const path = require("path")
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "/public")));
const lottery_artifact = require('./build/contracts/lottery.json');
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"))

const contract_lottery = new web3.eth.Contract(lottery_artifact.abi,
	'CONTRACT_ADDRESS')


app.get("/",(req,res)=>{

web3.eth.getAccounts().then(acc=>{
    contract_lottery.defaultAccount = acc[0]
    res.render("lottery",{accounts:acc})

})
})
app.post("/buy-tickets", (req,response)=>{
    console.log((+req.body.num_of_tickets)*10**18)

contract_lottery.methods.buyTickets(req.body.accountno, req.body.num_of_tickets)
.send({
    from: req.body.accountno, 
	
    value: (+req.body.num_of_tickets)*10**18
   })
.then(res => {
//   console.log('Success',res)
response.send("you have successfully bought "+req.body.num_of_tickets+" ticket(s)")
  
 })

.catch(err => {console.log(err)
	response.send("Some error took place")

})


})

app.get("/get-balance",(req,res)=>{
    contract_lottery.methods.getBalance().call().then(data=>{
		
        res.send(data)
      
    })
})
app.post("/get-details",(req,res)=>{
	
	contract_lottery.methods.findAddress(req.body.accountno).call().then(data=>{
		
		contract_lottery.methods.map_participant(data).call().then(data2=>{
		

			res.send(data2)
		})

	})
})
app.get("/get-winner",(req,res)=>{
	contract_lottery.methods.getBalance().call().then(data=>{
		contract_lottery.methods.chooseWinner().send({
			from:contract_lottery.defaultAccount,
			
			})
			.catch(err=>console.log(err))
	   
	}).catch(err=>{console.log(err)})
	contract_lottery.methods.winner().call().then(data=>{
		res.send(data)
	})

})
app.listen(3000, ()=>{
    console.log("listening at 3000")
})