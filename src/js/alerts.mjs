async function alertMessages() {
   const fetchResponse = await fetch("json/alerts.json");
   const alerts = await fetchResponse.json();
   var alertSection = document.createElement("SECTION");
   alertSection.setAttribute("class", "alert-list");
   alertSection.setAttribute("id", "alert-list");
   
   for ( let x in alerts) {
         var alertMessageP = document.createElement("P");
         alertMessageP.style.backgroundColor = alerts[x].background;
         alertMessageP.style.color = alerts[x].color;
         alertMessageP.style.textAlign = "center";
         let messageNumber = Number(x) + 1;
         alertMessageP.innerHTML = messageNumber + ": " + alerts[x].message;
         alertSection.appendChild(alertMessageP);
   }
   document.getElementById("main").insertAdjacentElement("afterbegin", alertSection);
}
alertMessages();