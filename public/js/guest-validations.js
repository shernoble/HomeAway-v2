document.addEventListener("DOMContentLoaded",function(){

    const form_starting=document.getElementById("startingForm");
    if(form_starting!=null){
        form_starting.addEventListener("submit",function(event){
            if(!validateStartingPage()){
                event.preventDefault();
            }
        })
    }
    

    const form2=document.getElementById("reserveForm");
    if(form2!=null){
        form2.addEventListener("submit",function(event){
            if(!validateDates()){
                event.preventDefault();
            }
        });
    }

    function validateStartingPage(){
        const num_guests=document.getElementById("guests").value;
        const start_date=new Date (document.getElementById("fromDate").value);
        const end_date=new Date(document.getElementById("toDate").value);
    
        // date validations
        // get curr date
        // put max days for booking:no more than 2 weeks
        const curr_date=new Date();
        const curr_time=curr_date.getTime();
        const start_time=start_date.getTime();
        const end_time=end_date.getTime();
        if(start_time<curr_time || end_time<curr_time || start_time>end_time){
            alert("invalid dates");
            return false;
        }
        num_days=(end_time-start_time)/(1000*60*60*24);
        
        console.log("duration:"+num_days);
        if(num_guests>20){
            alert("max number of guests is 20");
            return false;
        }
        if(num_days>10){
            alert("duration of stay cannot be more than 10 days");
            return false;
    
        }
        
        return true;
    
    }

    function validateDates(){

        const start_date= new Date (document.getElementById("checkin").value);
        const end_date= new Date (document.getElementById("checkout").value);
        // const 

        const curr_date=new Date();
        const curr_time=curr_date.getTime();
        const start_time=start_date.getTime();
        const end_time=end_date.getTime();
        if(start_time<curr_time || end_time<curr_time || start_time>end_time){
            alert("invalid dates");
            return false;
        }
        
        return true;
    }
    const confBtn=document.getElementById("confirmBtn");
    if(confBtn!=null){
        confBtn.addEventListener('click',function(){
            console.log('click!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const listID=document.getElementById('listId').value;
            const hostID=document.getElementById('hostId').value;
            const checkin=new Date(document.getElementById('ci').value);
            const checkout=new Date(document.getElementById('co').value);
            const confetti=document.getElementsByClassName('cp');
            const confDiv=document.getElementById('conf');
            console.log('checkinres:'+ci);
            console.log('cores:'+co);
            const bookingMessage=document.getElementById('booking-message');

            const xhr = new XMLHttpRequest();
        xhr.open('POST', '/guest/confirmBooking', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // Booking successful
                    bookingMessage.classList.remove('alert-danger');
                    bookingMessage.classList.add('alert-success');
                    bookingMessage.innerHTML = 'Booking successful!';
                    confDiv.classList.add('confetti');
                    for(let i=0;i<confetti.length;i++){
                        confetti[i].classList.add('confetti-piece');
                    }
                    setTimeout(function () {
                        for(let i=0;i<confetti.length;i++){
                            confetti[i].classList.remove('confetti-piece');
                        }
                        confDiv.classList.remove('confetti');
                    }, 3000);
                    
                } else {
                    bookingMessage.classList.remove('alert-success');
                    bookingMessage.classList.add('alert-danger');
                    bookingMessage.innerHTML = 'Booking failed. Please try again.';
                }
            } else {
                bookingMessage.classList.remove('alert-success');
                bookingMessage.classList.add('alert-danger');
                bookingMessage.innerHTML = 'Booking dates not available for this place.';
            }
        };

        xhr.onerror = function () {
            bookingMessage.classList.remove('alert-success');
            bookingMessage.classList.add('alert-danger');
            bookingMessage.innerHTML = 'An error occurred while processing your request.';
        };

        const data = JSON.stringify({ listID,hostID,checkin,checkout });
        console.log('data:'+data);
        xhr.send(data);

        })
    }
    

});
