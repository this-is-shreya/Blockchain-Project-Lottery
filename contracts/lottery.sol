
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract lottery{

    struct participants{
        address add;
        uint num_of_tickets;
    }
    uint public num_of_participants =0;
    
    mapping(uint=>participants) public map_participant;
address public winner;

    function buyTickets(address a, uint num) external payable {
        require(msg.value == (1 ether)*num);
        if(findAddress(a) == 999){
    map_participant[num_of_participants] = participants(a,num);
    num_of_participants++;
    
        }
        else{

        map_participant[findAddress(a)] = participants(a, map_participant[findAddress(a)].num_of_tickets +num);
       
        }
    }

    function findAddress(address a) public view returns(uint){
        for(uint j =0; j<=num_of_participants;j++){
            if(map_participant[j].add == a){
                return j;
            }
        }
        return 999;
    
    }
 
   
   function chooseWinner() external payable
{
if(getBalance()!=0){
 uint pos = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty)))%num_of_participants;
 payable(map_participant[pos].add).transfer(address(this).balance);
 winner = map_participant[pos].add;
}

}

function getBalance() public view returns(uint){
return address(this).balance;
}

}