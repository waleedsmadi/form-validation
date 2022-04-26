// select all elements 
const inputsEl = Array.from(document.querySelectorAll(".form input")),
      btnEl = document.querySelector(".form button");



// set error | success status functions
function setSuccess(element, msg){
    const parent = element.parentElement;
    parent.classList.remove("error");
    parent.classList.add("success");
    const smallTag = parent.querySelector("small");
    smallTag.innerText = msg;
}


function setError(element, msg){
    const parent = element.parentElement;
    parent.classList.remove("success");
    parent.classList.add("error");
    const smallTag = parent.querySelector("small");
    smallTag.innerText = msg;
}





// check validation functions
function isEmailValid(email){
    const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regx.test(email);
}

function isUsernameValid(username){
    if(username.length >= 3) return true 
    return false
}

function isPasswordValid(password){
    if(password.length >= 6) return true 
    return false
}





// events on inputs fields
inputsEl.forEach(input => {
    input.addEventListener("input", function(e){
        const theInput = e.target; 
        const theValue = e.target.value;

        // username
        if(theInput.id == 'username'){
            if(theValue == ''){
                setError(theInput, "Required");
            }else if(!isUsernameValid(theValue)){
                setError(theInput, "Invalid");
            }else if(isUsernameValid(theValue)){
                setSuccess(theInput, "Valid");
            }
        }

        // email
        else if(theInput.id == "email"){
            if(theValue == ''){
                setError(theInput, "Required");
            }else if(!isEmailValid(theValue)){
                setError(theInput, "Invalid");
            }else if(isEmailValid(theValue)){
                setSuccess(theInput, "Valid");
            }
        }

        // password
        else if(theInput.id == "pass"){

            // get the re-password input to control enabled/diabled attr
            const rePassword = document.querySelector("#re-pass");
            oldPassword = theValue;
            if(theValue == ''){
                setError(theInput, "Required");
                rePassword.disabled = true;
            }else if(!isPasswordValid(theValue)){
                setError(theInput, "Invalid");
                rePassword.disabled = true;
            }else if(isPasswordValid(theValue)){
                setSuccess(theInput, "Valid");
                rePassword.disabled = false;
            }
        }

        // re-password
        else if(theInput.id == 're-pass'){
            if(theValue == ''){
                setError(theInput, "Required");
            }
            if(theValue != oldPassword){
                setError(theInput, "Not identical");
            }else{
                setSuccess(theInput, "Valid");
            }
            console.log(oldPassword);
        }
    });
});



// sign up button event
btnEl.addEventListener("click", function(e){
    
    // check if all field are satisfied
    let allRequierd = true;
    inputsEl.forEach(input =>{
        if(input.value === ''){
            setError(input, "this requierd");
            allRequierd = false;
        }else{
            if(!input.classList.contains("success")){
                allRequierd = false;
            }
        }

        if(!allRequierd){
            e.preventDefault();
            return
        }
    });
});