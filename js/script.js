  var inputName=document.querySelector("#name");
  var inputWrongName=document.querySelector("#wrong-name");
  var inputEmail=document.querySelector("#email");
  var loginEmail=document.querySelector("#signIn-email");
  var loginPassword=document.querySelector("#signIn-password");
  var inputWrongEmail=document.querySelector("#wrong-email")
  var inputPassword=document.querySelector("#password");
  var inputWrongPassword=document.querySelector("#wrong-password")
  var btn =document.querySelector("#sign-in-btn");
  var pathparts = location.pathname.split('/');
  var baseURL = ''
 

//say welcome
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}


var allData=[]
if (localStorage.getItem('users') == null) {
  allData = []
} else {
  allData = JSON.parse(localStorage.getItem('users'))
}

function isEmpty(){
  for(var i=0; i<allData.length;i++){
    if(inputName.value==" "|| inputEmail.value== " " || inputPassword.value== " "){
      return false
    }
    else{
      return true
    }
  }
}
function isEmailExist(){
  for(var i=0 ; i<allData.length ; i++){
    if (allData[i].userEmail.toLowerCase() == inputEmail.value.toLowerCase()){
      return false;
    }
  }
}




btn.addEventListener("click", function(){
  if (isEmpty() == false) {
    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
    return false
}
  if(validateName() && validateEmail() && validatePassword()){

  
    
    var data={
      userName:inputName.value,
      userEmail:inputEmail.value,
      userPassword:inputPassword.value,
    }

    if (allData.length == 0) {
      allData.push(data)
      localStorage.setItem('users', JSON.stringify(allData))
      document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
      return true
  }
    if (isEmailExist() == false){
      document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
   }
  
    
    else{
      allData.push(data)
      localStorage.setItem('users', JSON.stringify(allData))
      document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
    }
    clear();
    
    
  }


})

//clear fun

function clear() {
  inputName.value=""
  inputEmail.value=""
  inputPassword.value=""
}

//validate name
function validateName(){

var nameRegx=/^[A-Z][a-z0-9]{3,8}$/
if(nameRegx.test(inputName.value)){
  
  inputWrongName.classList.add("d-none")
  return true;
}
else{
  inputWrongName.classList.remove("d-none");
  
  return false;
}

}

function validateEmail(){
  var emailRegx=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

  if(emailRegx.test(inputEmail.value)){
    inputWrongEmail.classList.add("d-none");
    return true;
  }
  else{
    inputWrongEmail.classList.remove("d-none");
    return false;
  }

}

function validatePassword(){
  var passwordRegx=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
 
  if(passwordRegx.test(inputPassword.value)){
    inputWrongPassword.classList.add("d-none");
    return true;
  }
  else{
    inputWrongPassword.classList.remove("d-none");
    return false;
  }
}

// loginnnnn

function loginIsEmpty(){
  if(loginEmail.value == "" || loginPassword.value == ""){
   return false

  }else{
    return true
  }

}

function login(){
  if(loginIsEmpty() == false){
    document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
  }

  var password=loginPassword.value;
  var email=loginEmail.value;

  for (var i = 0; i < allData.length; i++) {
    if (allData[i].userEmail.toLowerCase() == email.toLowerCase() && allData[i].userPassword.toLowerCase() == password.toLowerCase()) {
        localStorage.setItem('sessionUsername', allData[i].userName)
        if (baseURL == '/') {
            location.replace('https://' + location.hostname + '/home.html')

        } else {
            location.replace(baseURL + '/home.html')

        }
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
    }
}
}

function logout() {
  localStorage.removeItem('sessionUsername')
}
