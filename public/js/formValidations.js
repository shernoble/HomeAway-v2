document.addEventListener("DOMContentLoaded",function()
{    
    console.log("dom fully loaded and parsed");

    const form_login=document.getElementById("login");
    if(form_login!=null){
        form_login.addEventListener("submit",function(event) {
            if(!validLogin()){
                event.preventDefault();
            }
        })
    }
    
    const form_signup=document.getElementById("register");
    if(form_signup!=null){
        form_signup.addEventListener("submit",function(event) {
            console.log("submishfo");
            if(!validsignup()){
                event.preventDefault();
            }
        })
    }
    
    
    function validLogin(){
        console.log("halo1");
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        var mailid=document.getElementById("email").value;
        if(!emailRegex.test(mailid)) 
        {
            alert("invalid email address");
            return false;
            
        }
        else return true;
    }

    


    function validsignup()
    {
        console.log("halo2");
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
        const phoneRegex = /^\d{10}$/;
        var username=document.getElementById("username").value;
        var PhoneNumber=document.getElementById("phone").value;
        var mailid=document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var password2 = document.getElementById("confirmPassword").value;
        if(!emailRegex.test(mailid)) {
            alert("invalid email address");
            return false;
        }
        else if(!phoneRegex.test(PhoneNumber))
        {
            alert("invalid phone number");
            return  false;
        }

        else if(!(password.length>=8 || password.length<=24)) {
            alert("Password length should be between 8-24");
            return false;
        }
        else if(!passRegex.test(password)){
            alert("Password must contain minimum eight characters, at least one alphabet, one number and one special character");
            return false;
        }
        else if(password!=password2) {
            alert("Password doesnt match");
            return false;
        }
        else
        {
            return true;
        }
    }

});