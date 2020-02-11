
//contact form modal

function validation() {
let firstname = document.getElementById("form_firstname").value;
let lastname = document.getElementById("form_lastname").value; 
let email = document.getElementById("form_email").value; 

let subject = document.getElementById("form_subject").value;
let message = document.getElementById("form_message").value;


$('#myModal').modal('toggle');
document.querySelector(".firstname").innerHTML = firstname;
document.querySelector(".lastname").innerHTML = lastname;
document.querySelector(".email").innerHTML = email;
document.querySelector(".subject").innerHTML = subject;
document.querySelector(".message").innerHTML = message;

}
document.getElementById('sendmodal').addEventListener('click',validation);


//anchor arrow




let arrowDiv = document.getElementById("arrowup");
let arrow = document.createElement("a");
arrow.setAttribute("href","#arrowanchor");
let iconArrow = document.createElement('i');
iconArrow.setAttribute('id','iconanchor');
iconArrow.setAttribute('class','fas fa-arrow-circle-up fa-3x');
arrow.appendChild(iconArrow);
arrowDiv.appendChild(arrow);
