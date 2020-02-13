//firstvideojumbotron

function firstvideo() {

    $('#modalvideo1').modal('toggle');
    
    }
    
    document.getElementById('firstvideo').addEventListener('click', firstvideo);


    //secondvideojumbotron

function secondvideo() {

    $('#modalvideo2').modal('toggle');
    
    }
    
    document.getElementById('secondvideo').addEventListener('click', secondvideo);

  //3videojumbotron

  function threevideo() {

    $('#modalvideo3').modal('toggle');
    
    }
    
    document.getElementById('3video').addEventListener('click', threevideo);

//login modal

function login() {

$('#myModallogin').modal('toggle');

}

document.getElementById('sendmodallogin').addEventListener('click', login);


//register modal

function register() {

    $('#myModalregister').modal('toggle');
    
    }
    
    document.getElementById('sendmodalregister').addEventListener('click', register);
    
    


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



//call to action

function newsletter() {

    $('#modalcallaction').modal('toggle');
    
    }
    
    document.getElementById('sendnewsletter').addEventListener('click', newsletter);


//anchor arrow

let arrowDiv = document.getElementById("arrowup");
let arrow = document.createElement("a");
arrow.setAttribute("href","#arrowanchor");
let iconArrow = document.createElement('i');
iconArrow.setAttribute('id','iconanchor');
iconArrow.setAttribute('class','fas fa-arrow-circle-up fa-3x');
arrow.appendChild(iconArrow);
arrowDiv.appendChild(arrow);
