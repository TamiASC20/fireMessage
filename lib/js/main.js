const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let database = firebase.database().ref(); //establish a reference to the root of our database

/**
 * Updates the database with the username and message.
 */
function updateDB(event){ //our callback function
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    let value = {
        //make 2 columns (like in excel)
        NAME: username,
        MESSAGE: message
    }

    //make a row (like in excel)
    database.push(value);

}

// Set database "child_added" event listener here. It checks if there are any childs in the database
database.on("child_added", addMessageToBoard);

function addMessageToBoard(rowData) { //callback function
    let row = rowData.val(); //returns object just like the value object pushead into the database
    console.log(row)
    //make a reference to the container we want to add the messages in 
    let messageContainer = document.querySelector(".allMessages")
    let newP = document.createElement("p");
    newP.innerText = row.NAME + " : " + row.MESSAGE;
    messageContainer. appendChild(newP);
}