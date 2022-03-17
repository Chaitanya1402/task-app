function addElement() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let itemsJSONArr = [];
    let table = document.getElementById("tableBody");
    let str = '';

    if (title == "") {
        document.getElementById("task-error").style.visibility = "visible";
        document.getElementById("title").focus();
    }
    else if (description == "") {
        document.getElementById("task-error").style.visibility = "hidden";
        document.getElementById("desc-error").style.visibility = "visible";
        document.getElementById("description").focus();
    }
    else {
        document.getElementById("task-error").style.visibility = "hidden";
        document.getElementById("desc-error").style.visibility = "hidden";
        if (localStorage.getItem('itemsJSON') == null) {
            itemsJSONArr.push([title, description]);
            localStorage.setItem('itemsJSON', JSON.stringify(itemsJSONArr));
        }
        else {
            itemsJSONArr = localStorage.getItem('itemsJSON');
            itemsJSONArr = JSON.parse(itemsJSONArr);
            itemsJSONArr.push([title, description]);
            localStorage.setItem('itemsJSON', JSON.stringify(itemsJSONArr));
        }
        itemsJSONArr.forEach((element, index) => {
            str += `<tr>
            <td class="sr-no">${index + 1}</td>
            <td style="width:25%">${element[0]}</td>
            <td style="width:55%">${element[1]}</td>
            <td class="act"><button class="delete" id="clear" type="button" onclick="deleteElem(${index})">Delete</button></td>
            </tr>`;
        });
        table.innerHTML = str;
    }

}

function clearAll() {
    if (confirm("Are you sure you want to clear your TODO list completely?")) {
        localStorage.clear();
        update();
    }
}

function update() {
    let itemsJSONArr = [];
    let table = document.getElementById("tableBody");
    let str = '';
    if (localStorage.getItem('itemsJSON') != null) {
        itemsJSONArr = localStorage.getItem('itemsJSON');
        itemsJSONArr = JSON.parse(itemsJSONArr);
    }
    itemsJSONArr.forEach((element, index) => {
        str += `<tr>
        <td class="sr-no">${index + 1}</td>
        <td style="width:25%">${element[0]}</td>
        <td style="width:55%">${element[1]}</td>
        <td class="act"><button class="delete" id="clear" type="button" onclick="deleteElem(${index})">Delete</button></td>
        </tr>`;
    });
    table.innerHTML = str;
}

function deleteElem(index) {
    itemsJSONArr = localStorage.getItem('itemsJSON');
    itemsJSONArr = JSON.parse(itemsJSONArr);
    itemsJSONArr.splice(index, 1);
    localStorage.setItem('itemsJSON', JSON.stringify(itemsJSONArr));
    update();
}

update();