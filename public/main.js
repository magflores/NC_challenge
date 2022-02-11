const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('http://localhost:8081/api/members', {
        method: 'post',
        body: formData
    }).then(function (response) {
        return response.text();
    }).then(function(text) {
        console.log(tex)
    }).catch(function (error) {
        console.error(error);
    })
});

async function loadIntoTable(url, table) {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    // const { headers, rows } = await response.json();
    const data = await response.json();

    for (const row of data) {
        const rowElement = document.createElement("tr");

        for (const cellText of row) {
            const cellElement = document.createElement("td");
            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }
        
        tableBody.appendChild(rowElement);
    }

} 

loadIntoTable("http://localhost:8081/api/members", document.querySelector("table"));