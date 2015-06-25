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
        url: "rest/test/",
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

function createTeacher() {
    var teacher = new Object();
    teacher.name = $("#signup #name input").val();
    teacher.login = $("#signup #email input").val();
    teacher.pwd = $("#signup #password input").val();
    pwdConfirm = $("#signup #password_confirm input").val();
    if (teacher.pwd.length < 4) {
        teacher.pwd = $("#signup #password input").val("");
        pwdConfirm = $("#signup #password_confirm input").val("");
        $("#signup #password").addClass("has-error");
        $("#signup #password .help-block").html("<p class='help-block'>Password has less than 4 characters</p>");
    } else if (teacher.pwd !== pwdConfirm) {
        teacher.pwd = $("#signup #password input").val("");
        pwdConfirm = $("#signup #password_confirm input").val("");
        $("#signup #password").addClass("has-error");
        $("#signup #password .help-block").html("<p class='help-block'>Passwords don't match</p>");
    } else {
        var response;
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "rest/teacher/",
            dataType: "text",
            data: JSON.stringify(teacher),
            success: function (data, textStatus, jqXHR) {
                response = data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Server error");
            }
        });
        if (data === "GERAI GERAI") {

        } else if (data === "ERROR EXISTS") {
            $("#signup #password").addClass("has-error");
            $("#signup #password .help-block").html("<p class='help-block'>Passwords don't match</p>");
        }
        $("#signup #password").removeClass("has-error");
        $("#signup #password .help-block").html("<p class='help-block'>Password should be at least 4 characters</p>");
    }
}

function login() {

}

function showContainer(id) {
    $("div#home").hide();
    $("li#home").removeClass("active");
    $("div#create").hide();
    $("li#create").removeClass("active");
    $("div#about").hide();
    $("li#about").removeClass("active");
    $("div#" + id).show();
    $("li#" + id).addClass("active");
}