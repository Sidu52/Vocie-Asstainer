import React from 'react'

export default function Calculator() {


  return (
    <div>
      
    </div>
  )
}


// var button=document.getElementsByClassName("button");
// var display=document.getElementById("display");
// var operand1=0;
// var operand2=null;
// var operator=null;
// var data="";
// for(var i=0; i<button.length;i++){
//     button[i].addEventListener('click',function () {
//         var value=this.getAttribute('data-value');
//         if(value =='+'){
//             operator='+';
//             display.innerText+=value;
//             operand1=data;
//             data="";
           
//         }
//         else if(value=='-'){
//             operator='-';
//             display.innerText+=value;
//             operand1=data;
//             data="";
            
//         }
//         else if(value=='*'){
//             operator='*';
//             display.innerText+=value;
//             operand1=data;
//             data="";
        
//         }
//         else if(value=='/'){
//             operator='/';
//             display.innerText+=value;
//             operand1=data;
//             data="";
//         }
//         else if(value=='='){
//             operand2=data;
//             var result=eval(operand1+" "+operator+" "+operand2);
//             if(result==Infinity){
//                 display.innerText="Error";
//             }
//             else{
//                 display.innerText=result;
//             }
            
//             value="";
//             data=result;
//         }
//         else if(value=="Ac"){
//             value="";
//             data="";
//             display.innerText=value;
//         }
//         else if(value=="sing"){
//             if(operand1<0){
//                 operand1=data;
//                 display.innerText=operand1;
//             }
//             else{
//                 operand1=-data;
//                 display.innerText=operand1;
//             }
//         }
//         else if(value=="%"){
//             var result=data/100;
//             display.innerText=result;

//         }
//         else{
//             data+=value;
//             display.innerText+=value;
//         }
//     })
// }