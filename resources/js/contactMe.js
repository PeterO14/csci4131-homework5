const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const questionCategory = document.getElementById("question");
const commentCategory = document.getElementById("comment");
const concernCategory = document.getElementById("concern");

emailInput.addEventListener("change", usernameFill);
questionCategory.addEventListener("change", concernedMessage);
commentCategory.addEventListener("change", concernedMessage);
concernCategory.addEventListener("change", concernedMessage);

function usernameFill(event) 
{  
    const regexCheck = new RegExp("[A-Za-z0-9]+@+[A-Za-z0-9]");
    let usernameAutofill = "";

    // Check if email passes regex and if username is empty
    if (regexCheck.test(event.target.value) && usernameInput.value == false)
    {
        for (let i = 0; i < event.target.value.length; i++)
        {
            // If we see an @, return because we don't want to go further
            if (event.target.value[i] == "@")
            {
                usernameInput.value = usernameAutofill;
                return;
            }
            usernameAutofill += event.target.value[i];
        }
    }
}

function concernedMessage(event)
{
    const concernMessage = document.querySelector(".concernInfo");

    if (event.target.value == "concern")
    {
        concernMessage.style.display = "inline";
    }
    else 
    {
        concernMessage.style.display = "none";
    }
}