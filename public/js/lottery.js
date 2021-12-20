let winner = document.getElementById("winner")
let account = document.getElementById("account")
let tickets = 0

num_of_tickets =(a)=>{
    if(isNaN(a.value)){
        alert("Please enter only numeric value")
    }
    else{
        tickets = a.value
    }
}

$("#buy").on("click",()=>{
    $.ajax({
        url:"/buy-tickets",
        method:"POST",
        data:{accountno:account.value, num_of_tickets:tickets},
        success:function(res){
            alert(res)
        }
    })
})
$("#balance").on("click",()=>{
    $.ajax({
        url:"/get-balance",
        method:"GET",
        success:function(res){
            alert(res*10**(-18))
        }
    })
})
$("#details").on("click",()=>{
    $.ajax({
        url:"/get-details",
        method:"POST",
        data:{accountno:account.value},
        success:function(res){
        
            $("#details_display").html("address is: "+res.add +" number of tickets bought: "+ res.num_of_tickets)
        }
    })

})
$("#winner").on("click",()=>{
    $.ajax({
        url:"/get-winner",
        method:"GET",
        success:function(res){
            $("#winner_display").html("winner is: "+res)
        }
    })
})