$(document).ready(function() {
console.log (`
     _                   _     _           _  ___   ___  
    | | ___   __ _  ___ | |   (_)_   _____/ |/ _ \\ / _ \\                Visite meu GitHub!
 _  | |/ _ \\ / _\` |/ _ \\| |   | \\ \\ / / _ \\ | | | | | | |           https://github.com/JoaoLive100
| |_| | (_) | (_| | (_) | |___| |\\ V /  __/ | |_| | |_| |
 \\___/ \\___/ \\__,_|\\___/|_____|_| \\_/ \\___|_|\\___/ \\___/ 

Feito com dedicação por JoaoLive100 (João Rodrigues Parra) para o processo seletivo da DTI Digital.
`);

});

const form = document.getElementById('form');
form.addEventListener('submit', e => {
    e.preventDefault();

    let reminderName = $('#name').val();
    let reminderDate = $('#date').val();
    insertReminder(reminderDate, reminderName);
});

function deleteReminder (element) {
    element.innerHTML = '';
}

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
            const elements = document.querySelectorAll('.deleteicon');
            for (let i = 0; i < elements.length; i++) {
                elements[i].addEventListener('click', function() {
                    const li = elements[i].closest('li');
                    const date = li.parentNode.previousSibling.innerHTML;
                    const tarefa = li.lastChild.innerHTML;
                    $.ajax({
                        url: './remindme-api/index.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            date : date,
                            tarefa : tarefa,
                            delete : "true"
                        },
                        success: function(response) {
                            console.log(response);
                            li.parentNode.removeChild(li);
                        }
                    });
                });
            }
        }
    });
}