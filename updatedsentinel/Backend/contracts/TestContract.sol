pragma solidity ^0.4.7;

contract TestContract{
    string coaf;
    string choice;
    string info;
    
    function TestContract(string _coaf, string _choice, string _info){
        coaf = _coaf;
        choice = _choice;
        info = _info;
    }
    
    
    function getFields() constant returns(string, string, string){
        return(coaf,choice,info);
        
    }
    
    function setChoice(string _choice) {
        choice = _choice;
    }
    
}