// Display the image
function mouseOverHandler(event)
{
    const rows = ["row2", "row3", "row4", "row5", "row6"];
    const images = ["theshire.jpeg", "hogwarts.jpeg", "westeros.jpeg", "mpls.jpeg", "arrakis.jpeg"];
    let rowVar = "";

    for (let i = 0; i < rows.length; i++)
    {
        if (event.target.parentNode.className == rows[i] || event.target.parentNode.parentNode.className == rows[i]) {
            rowVar = "." + rows[i] + " .image";
            document.querySelector(rowVar).style.display = "inline";

            imageVar = "images/" + images[i];
            document.querySelector(".contactsImage").src = imageVar;
        }
    }
}

// Remove the image 
function mouseOutHandler(event)
{
    const rows = ["row2", "row3", "row4", "row5", "row6"];

    for (let i = 0; i < rows.length; i++)
    {
        if (event.target.parentNode.className == rows[i] || event.target.parentNode.parentNode.className == rows[i]) {
            rowVar = "." + rows[i] + " .image";
            document.querySelector(rowVar).style.display = "none";

            document.querySelector(".contactsImage").src = "images/contacts.png";
        }
    }
}

// Sort a table column
function columnSort(event)
{
    let rows = [".row2", ".row3", ".row4", ".row5", ".row6"];
    const headers = ["tableHeadName", "tableHeadLocation", "tableHeadInfo", "tableHeadEmail", "tableHeadWeb"];
    let sortIdx = 0;

    for (let i = 0; i < headers.length; i++)
    {
        if (event.target.className == headers[i])
        {
            sortIdx = i*2 + 1;
            console.log("sortIdx: " + sortIdx);
        }
    }

    console.log(rows);
    rows.sort((a, b) => {
        const newA = document.querySelector(a).childNodes[sortIdx].innerText;
        console.log("a/newA = " + a + "/" + newA);

        const newB = document.querySelector(b).childNodes[sortIdx].innerText;
        console.log("b/newB = " + b + "/" + newB);

        if (newA > newB)
        {
            return 1;
        }
        if (newA < newB)
        {
            return -1;
        }
        return 0;
    });
    console.log(rows);

    const root = document.querySelector(".contactsTable");
    
    for (let i = 0; i < rows.length; i++)
    {
        root.appendChild(document.querySelector(rows[i]));
    }
}

const rows = [".row1", ".row2", ".row3", ".row4", ".row5", ".row6"];
for (let i = 1; i < rows.length; i++)
{
    // Register event handlers for image preview
    document.querySelector(rows[i]).addEventListener("mouseover", mouseOverHandler);
    document.querySelector(rows[i]).addEventListener("mouseout", mouseOutHandler);
}

// Register event handlers for table sorting
document.querySelector(rows[0]).addEventListener("click", columnSort);