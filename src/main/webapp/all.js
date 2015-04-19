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

function addAnswer(senderIndex) {
    var nbAnswers = $("#" + senderIndex + " [type='radio']").length;
    var html = "<div class='input-group'><span class='input-group-addon'><input type='radio' name='" + senderIndex + "' value='" + nbAnswers + "'></span><input type='text' class='form-control' name='" + nbAnswers + "'></div><br>";
    $(html).insertBefore("#" + senderIndex + " button");
}

var nbQuestions = 0;

function addQuestion() {
    ++nbQuestions;
    var html = "<div class='panel panel-default' id='" + nbQuestions + "'><div class='panel-heading'><input type='text' class='form-control' placeholder='Question'></div><div class='panel-body'><div class='input-group'><span class='input-group-addon'><input type='radio' name='" + nbQuestions + "' value='0' checked></span><input type='text' class='form-control' name='" + 0 + "'></div><br><div class='input-group'><span class='input-group-addon'><input type='radio' name='" + nbQuestions + "' value='1'></span><input type='text' class='form-control' name='" + 1 + "'></div><br><button type='button' onclick='addAnswer(" + nbQuestions + ")' class='btn btn-default btn-xs'>Add an answer</button></div></div>";
    $(html).insertBefore("#add")
}

var test = new Object();

function saveToDB() {
    test.subject = $("#info [placeholder='Class']").val();
    test.title = $("#info [placeholder='Subject']").val();
    test.teacher = $("#info [placeholder='Teacher']").val();
    test.questions = [];
    for (i = 0; i <= nbQuestions; i++) {
        var quest = new Object();
        var currentPanel = $("#" + i);
        quest.text = currentPanel.find("[placeholder='Question']").val();
        quest.responses = [];
        for (j = 0; j < currentPanel.find("[type='radio']").length; j++) {
            var radio = currentPanel.find("[type='radio'][value='" + j + "']");
            var text = currentPanel.find("[type='text'][name='" + j + "']");
            quest.responses.push(text.val());
            if (radio.is(":checked"))
                quest.answer = j;
        }
        test.questions.push(quest);
    }
    postTest(JSON.stringify(test));
}

function postTest(json) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "rest/user/",
        dataType: "json",
        data: json,
        success: function (data, textStatus, jqXHR) {
            alert("success!");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('postUser error: ' + textStatus);
        }
    });
}