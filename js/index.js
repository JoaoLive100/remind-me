$(document).ready(function() {
console.log (`
     _                   _     _           _  ___   ___  
    | | ___   __ _  ___ | |   (_)_   _____/ |/ _ \\ / _ \\                Visite meu GitHub!
 _  | |/ _ \\ / _\` |/ _ \\| |   | \\ \\ / / _ \\ | | | | | | |           https://github.com/JoaoLive100
| |_| | (_) | (_| | (_) | |___| |\\ V /  __/ | |_| | |_| |
 \\___/ \\___/ \\__,_|\\___/|_____|_| \\_/ \\___|_|\\___/ \\___/ 

Feito com dedicação por JoaoLive100 (João Rodrigues Parra) para o processo seletivo da DTI Digital.
`);

deleteReminder('','','');
});

const form = document.getElementById('form');
form.addEventListener('submit', e => {
    e.preventDefault();

    let reminderName = $('#name').val();
    let reminderDate = $('#date').val();
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    let dataAtual = ano+'-'+mes+'-'+dia;

    if (reminderDate < dataAtual) {
        alert("A data não pode ser anterior a data atual!");
    }
    else {
        insertReminder(reminderDate, reminderName);
    }
});

function insertReminder(reminderDate, reminderName) {

    $.ajax({
        url: './remindme-api/index.php',
        type: 'post',
        dataType: 'json',
        data: {
            name : reminderName,
            date : reminderDate,
            delete : "false"
        },
        success: function(response) {
            var jsonData = response;
            var ul = document.getElementById("main-ul");
            ul.innerHTML = '';
            for (var data in jsonData) {
                if (jsonData.hasOwnProperty(data)) {
                    var liData = document.createElement("li");
                    liData.innerHTML = data;
                    ul.appendChild(liData);
                    var ulTarefas = document.createElement("ul");
                    var tarefas = jsonData[data];
                    for (var i = 0; i < tarefas.length; i++) {
                        var liTarefa = document.createElement("li");
                        liTarefa.style.display = "inline-block";
                        liTarefa.style.width = "100%";
                        var img = document.createElement("img");
                        img.style.display = "inline-block";
                        img.style.width = "15px";
                        img.style.height = "15px";
                        img.style.verticalAlign = "middle";
                        img.src = "../img/remove.png";
                        img.classList.add("deleteicon");
                        liTarefa.appendChild(img);
                        var span = document.createElement("span");
                        span.style.display = "inline-block";
                        span.style.marginLeft = "10px";
                        span.style.verticalAlign = "middle";
                        span.innerHTML = tarefas[i];
                        liTarefa.appendChild(span);
                        ulTarefas.appendChild(liTarefa);
                    }
                    liData.appendChild(ulTarefas);
                }
            }
            insertEventListener();
        }
    });
}

function insertEventListener() {
    const elements = document.querySelectorAll('.deleteicon');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
            const li = elements[i].closest('li');
            const string = li.parentNode.parentNode.innerHTML;
            const regex = /\d{4}-\d{2}-\d{2}/;
            const match = string.match(regex);
            const date = match[0];
            const tarefa = li.lastChild.innerHTML;
            deleteReminder(li, date, tarefa);
        });
    }
}

function deleteReminder (li,dataB, tarefaB) {

    $.ajax({
        url: './remindme-api/index.php',
        type: 'post',
        dataType: 'json',
        data: {
            dataB : dataB,
            tarefaB : tarefaB,
            deleteB : "true"
        },
        success: function(responseB) {
            if(li) {
                li.parentNode.removeChild(li);
            }
            var jsonData = responseB;
            console.log(jsonData);
            var ul = document.getElementById("main-ul");
            ul.innerHTML = '';
            for (var data in jsonData) {
                if (jsonData.hasOwnProperty(data)) {
                    var liData = document.createElement("li");
                    liData.innerHTML = data;
                    ul.appendChild(liData);
                    var ulTarefas = document.createElement("ul");
                    var tarefas = jsonData[data];
                    for (var i = 0; i < tarefas.length; i++) {
                        var liTarefa = document.createElement("li");
                        liTarefa.style.display = "inline-block";
                        liTarefa.style.width = "100%";
                        var img = document.createElement("img");
                        img.style.display = "inline-block";
                        img.style.width = "15px";
                        img.style.height = "15px";
                        img.style.verticalAlign = "middle";
                        img.src = "../img/remove.png";
                        img.classList.add("deleteicon");
                        liTarefa.appendChild(img);
                        var span = document.createElement("span");
                        span.style.display = "inline-block";
                        span.style.marginLeft = "10px";
                        span.style.verticalAlign = "middle";
                        span.innerHTML = tarefas[i];
                        liTarefa.appendChild(span);
                        ulTarefas.appendChild(liTarefa);
                    }
                    liData.appendChild(ulTarefas);
                }
            }
            insertEventListener();
        }
    });
}
/*teste */