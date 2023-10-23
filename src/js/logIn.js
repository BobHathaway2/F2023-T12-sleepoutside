let customers = [];
let userFound = false;


 function showModal() {
    const reg = document.getElementById("register");
    reg.classList.remove("sign");
    reg.classList.add("show-sign");

    
}

// erbaamigodstime34@gmai.com
function logIn(event) {
    customers = JSON.parse(window.localStorage.getItem("customerData")) || [];

    event.preventDefault()
    const email = document.getElementById("email").value;    
    const passWord = document.getElementById("password").value;
    // console.log(email)
    // console.log(passWord)
    console.log(customers)
    console.log("Starting the loop")
    for (const customer of customers) {
        if (customer.Email === email && customer.Password === passWord) {
            userFound = true;
            window.location.href = '../home.html';
            console.log(customer.Id)
            
        }
       

       
    }

    if (!userFound) {        
            showModal();
            console.log("This user have nno account here")
        
        
    }
    console.log("loop is finished")

}
const signIn = document.getElementById("log-in");
// signIn.addEventListener("click", logIn)
signIn.addEventListener("click", function (event) {
    logIn(event);
});