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
        // const place=document.getElementById("location");
        const num_guests=document.getElementById("guests").value;
        const start_date=new Date (document.getElementById("fromDate").value);
        const end_date=new Date(document.getElementById("toDate").value);

        console.log(num_guests);
        console.log(""+start_date);
        console.log(""+end_date);

        console.log("hehehe");
    
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

        const curr_date=new Date();
        const curr_time=curr_date.getTime();
        const start_time=start_date.getTime();
        const end_time=end_date.getTime();
        if(start_time<curr_time || end_time<curr_time || start_time>end_time){
            alert("invalid dates");
            return false;
        }
        num_days=(end_time-start_time)/1000*60*60*24;

    }

});
