/*global $, console, document*/

/*
Open ready() method */  
$(document).ready(function () {
    
    "use strict";
    
    var nm, em, sb, ms, dt, errors, collect, i;
    
    /*Declare following variables: 

    nm - this variable stores the name of user
    (entered in HTML form)

    em - this variable stores the email of user
    (entered in HTML form) 

    sb - this variable stores the subject user
    entered in HTML form 

    ms - this variable stores the message user
    entered in HTML form

    dt - this object collects (stores) name, 
    email, subject and message from HTML form
    (all in one place)

    errors - this array stores error-messages 
    during the process of form-validation

    collect - this variable stores error-messages 
    parsed into HTML structure - this means looping 
    through array errors and parsing the values of 
    errors array to unordered list, and finally 
    saving the result in collect variable.

    i - this variable is used as index-pointer
    in loops. */
    
    dt = {};
    errors = [];
    
    /* 
    Assign {} to dt. It means this object is also 
    initially empty. */
    /* 
    Assign [] to errors. It means this array is
    initially empty. */
    
    $(".bg-main").load("./partials/home.html");
    
    
    function handleForm(ev) {
        
        ev.preventDefault();
        
        
        
    }
    
    /* 
    Use jQuery load() method to load the home page 
    content by default (on page load). HTML element 
    for loading content is div "box":
    <div class="bg-main">
      <div class="box"></div>
    </div> */
  

    /*
    ------------------------------
    HANDLING HTML FORM - SEND DATA 
    TO SERVER USING $.ajax({})
    ------------------------------ */
    
    function handleResponse(rsp) {
        
        // pass the data from server-side to <div class="container">
        $(".feedback").html(rsp);
        
        // clear your form:
        $("#name").val("");
        $("#email").val("");
    }
        

    
    /* 
    What happens if user is on contact page and 
    submits the form? 
    Handle the success response of form handling 
    ajax object - define function handleResponse.
    This function has a parameter - rsp
    for example. rsp contains server's 
    response to the request of web browser. */      
       /* 
       Pass the response to HTML element
       with class "feedback" placed below the 
       form element (in HTML document) */    
       /* 
       Use val() jQuery method to clear the form 
       fields name, email, subject and message */       
    /* 
    End function handleResponse */
    
    function handleErrors(jqXHR, textStatus, errorThrown) {
        console.log("textStatus = " + textStatus + "\n" +
                    "errorThrown = " + errorThrown);
    }

    /* 
    Handle the error response of form handling 
    ajax object - define function handleErrors
    with 3 parameters: jqXHR, textStatus, errorThrown */     
       /* 
       Print the error in JavaScript console */  
    /* 
    End function handleErrors */
    
    function validateForm(ev) {
        
        ev.preventDefault();
        
        nm = $("#name").val();
        em = $("#email").val();
        sb = $("#subject").val();
        ms = $("#message").val();
    /* 
    Define validateForm function The form will be handled 
    on submit event so you need event object parameter */
       /* 
       Prevent default behaviour of form element */ 
       /* 
       Access all form elements (name, email, subject and 
       message) and pass the outputs to variables declared 
       for that purpose */
  
        if (nm === "") {
            
            errors.push("<p>Full name?</p>");
            
        } else {
            
            dt.name = nm;
        }
        
       /* 
       VALIDATE NAME FIELD: */
       /* 
       if nm is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */         
          /* 
          Pass nm to object dt as a new 
          property of that object. */
       /* 
       end else */

        var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        
        if (em === "") {
            
            errors.push("<p>Email?</p>");
            
        } else {
            
            // regex.test() returns true or false
            if (regex.test(em)) {
                
                dt.email = em;
                
            } else {
                
                errors.push("<p>Invalid Email!");
                
                // remove invalid email from text-field
                $("#email").val("");
                em = "";
            }
        }
        
       /* 
       EVALUATE EMAIL FIELD: */
       /* 
       if em is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */             
          /* 
          Pass em to object dt as a new 
          property of that object. */
       /* 
       end else */

        if (sb === "") {
            
            errors.push("<p>Subject?</p>");
            
        } else {
            
            dt.subject = sb;
        }
        
       /* 
       EVALUATE SUBJECT FIELD: */
       /* 
       if sb is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */        
          /* 
          Pass sb to object dt as a new 
          property of that object. */
       /* 
       end else */
        
  
        if (ms === "") {
            
            errors.push("<p>Message?</p>");
            
        } else {
            
            dt.message = ms;
        }
        
       /* 
       EVALUATE MESSAGE FIELD: */
       /* 
       if ms is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */        
          /* 
          Pass ms to object dt as a new 
          property of that object. */
       /* 
       end else */

        if (errors.length === 0) {
            
            $.ajax({
                type: "POST",
                url: "./web-service/service.php",
                data: dt,
                dataType: "html"
            }).done(handleResponse).fail(handleErrors);
            
        } else {
            
            collect = "Please fix the following errors:";
            
            $.each(errors, function (i, v) {
                
                // print the errors inside <div class="container">
                collect += v;
                
                $(".feedback").html(collect);
                
                
            });
            
            errors=[];
            collect={};
        }
            
        }

       /* 
       FINALLY, IF THERE IS NO ERRORS SEND
       DATA TO SERVER, OTHERWISE PRINT ERRORS */
       /* 
       if errors array is empty: */    
          /* 
          Use $.ajax({}) to send dt 
          to server. Chain done() and fail() 
          methods to ajax object. Method done()
          calls handleResponse function if request 
          is successful otherwise fail() method
          calls handleErrors. */    
       /* 
       end if
       otherwise: */
          /* 
          Assign collect variable with initial message:
          "Please fix the following errors:" */
          /* 
          Loop through array errors and parse the values of 
          errors array to unordered list - for each loop iteration
          append (save) the result in collect variable. */
          /* 
          Pass collect to HTML element
          with class "feedback" placed below the 
          form element (in HTML document) */
          /* 
          Empty errors array */
          /* 
          Assign collect with empty string */
       /* 
       end else */
    /* 
    End function validateForm */
    
    

    /*
    ---------------------
    LOADING HTML PARTIALS
    --------------------- */
    
    $(".button").on("click", function (ev) {
        
        ev.preventDefault();
          
        if ($(this).text() === "Home") {
            
            $(".bg-main").load("./partials/home.html");
            
        } else {
            
            // make sure that load method has call-back function.
            // Inside this function you need to add event listener to <form>
            // and prevent default behaviour of <form> element.
            $(".bg-main").load("./partials/contact.html", function () {
                
            $("form").on("submit", validateForm);
            });
        }
    });
    
    /* 
    HANDLE NAV-BAR CLICK */
    /* 
    Use nav-bar link element as selector and 
    on() method for click-event. This event 
    handler needs to use event object to prevent 
    default behaviour of link element. */
       /* 
       Prevent default behaviour of link element */
       /* 
       Use if-statement to check if $(this).text()
       is equal to "Home" - if so, load home.html 
       partial, otherwise load contact.html partial.
       
       If contact.html is loaded, make sure that
       load() method also contains call-back function.
       Inside this call-back function, you will register 
       validateForm function for submit event of contact-form. */

   
    /* 
    End on() method */
    //$(".bg-main").on("submit","form" , validateForm);
});
/* 
End ready() method */