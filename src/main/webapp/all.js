function getUser(name) {
    $.getJSON("v1/user/" + name, function (data) {
        afficheUser(data)
    });
}

function afficheUser(data) {
    console.log(data);
    $("#reponse").html(data.id + " : " + data.name);
}

function postUser(name) {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "rest/user/",
        success: function (data, textStatus, jqXHR) {
            afficheUser(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('postUser error: ' + textStatus);
        }
    });
}
var dat;
function listUsers() {
    $.getJSON("rest/user/", function (data) {
        dat = data;
        var html = "" + data.title + "<br><ul>";
        var index = 0;
        for (index = 0; index < data.questions.length; ++index) {
            html = html + "<li>" + data.questions[index].text + "</li>";
            html = html + "<form>";
            for (index2 = 0; index2 < data.questions[index].responses.length; ++index2) {
                if (index2 == 0)
                    html = html + "<input type='radio' name='" +
                            index + "' value='" +
                            data.questions[index].responses[index2] + "' checked> " +
                            data.questions[index].responses[index2] + "<br>";
                else
                    html = html + "<input type='radio' name='" +
                            index + "' value='" +
                            data.questions[index].responses[index2] + "'> " +
                            data.questions[index].responses[index2] + "<br>";
            }
            html = html + "</form>"
        }
        html = html + "</ul>";
        console.log(html);
        $("#reponse").html(html);
    });
}

function afficheListUsers(data) {
    var html = '<ul>';
    var index = 0;
    for (index = 0; index < data.length; ++index) {
        html = html + "<li>" + data[index].name + "</li>";
    }
    html = html + "</ul>";
    $("#reponse").html(html);
}

function addAnswer() {
    var html = "<div class='input-group'><span class='input-group-addon'><input type='radio' name='0' value='1'></span><input type='text' class='form-control'></div><br>";
    $(html).insertBefore("#0 button");
}

function addQuestion() {
    var html = "<div class='panel panel-default'><div class='panel-heading'><input type='text' class='form-control' placeholder='Question'></div><div class='panel-body' id='0'><div class='input-group'><span class='input-group-addon'><input type='radio' name='0' value='0' checked></span><input type='text' class='form-control'></div><br><div class='input-group'><span class='input-group-addon'><input type='radio' name='0' value='1'></span><input type='text' class='form-control'></div><br><button type='button' onclick='addAnswer()' class='btn btn-default btn-xs'>Add an answer</button></div></div>";
    $(html).insertBefore("button:last")
}