let btn = document.getElementById("log-in");
let customers = []



function getNumber() {
    let numbers = ''
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      for (let i = 0; i < 5; i++) {
        const randomNumber = getRandomNumber(1, 9);
        numbers += randomNumber;
        
        
      }
      return numbers;
    
}
function showModal() {
    const reg = document.getElementById("register");
    reg.classList.remove("register");
    reg.classList.add("show-modal");

    
}
let random = getNumber();

btn.addEventListener("click", register);



function register(e) {
    e.preventDefault();
    let number = 0;
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const phoneNumber = document.getElementById("phonenumber").value;
    const email = document.getElementById("email").value;
    const passWord = document.getElementById("password").value;
    console.log(lastName)

    const customerDetails = {
        "Id": random,
        "Fname": firstName,                 
        "Lname": lastName, 
        "Phonenumber": phoneNumber,
        "Email": email,
        "Password": passWord,
        "Number": number += 1

    };

    customers = window.localStorage.getItem("customerData");
    customers = JSON.parse(customers);
    if (customers === null) {
        customers = [];
    }
    customers.push(customerDetails);
    window.localStorage.setItem("customerData", JSON.stringify(customers)); 
    showModal();

    

    }

