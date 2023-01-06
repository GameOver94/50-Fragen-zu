// Define spreadsheet URL.
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1e_JcnimRhDOQekJdqq7yciSDimJ25DJTrE2U-QNFsr0/edit#gid=940056310';



$(document).ready(function () {
    updateData();
    setInterval(updateData, 1000);
});

function updateData() {
    sheetrock({
        url: mySpreadsheet,
        reset: true,
        fetchSize: 10,
        callback: function (error, options, response) {

            const backendData = {};
            response.rows[1].labels.forEach((element, index) => {
                backendData[element] = response.rows[1].cellsArray[index];
            });

            updateHTML(backendData);
        }
    });
};


function updateHTML(backendData) {
    //console.log(backendData);

    $("#number").text(backendData.questionID);
    $("#question span").text(backendData.question);
    textFit($('#question'), { alignVert: true, minFontSize: convertRemToPixels(0.4), maxFontSize: convertRemToPixels(0.8), multiLine: true })

    if (backendData.questionType != "M") {
        if (backendData.image != "N/A") {
            $("#multibleChoice").hide();
            $("#questionImage").show();
            $("#questionImage").attr("src", backendData.image);
        } else {
            $("#multibleChoice").hide();
            $("#questionImage").hide();
        }

    } else {
        $("#questionImage").hide();
        $("#multibleChoice").show();
        var data = Papa.parse(backendData.multibleChoice);

        $("#multibleChoice").empty();
        data.data[0].forEach((element) => {
            $("#multibleChoice").append(
                `<div class="choice">
                    <div>` + element + `</div>
                </div>`);
        });
        textFit($('.choice div'), { alignVert: true, minFontSize: convertRemToPixels(0.4), maxFontSize: convertRemToPixels(0.8) })
    }


    $("#points1 span").text(backendData.player1_points);
    $("#answer1 span").text(backendData.player1_answer);
    if (backendData.player1_ready == "TRUE") {
        $("#ready1").css("background-color", "green");
    } else {
        $("#ready1").css("background-color", "red");
    }

    $("#points2 span").text(backendData.player2_points);
    $("#answer2 span").text(backendData.player2_answer);
    if (backendData.player2_ready == "TRUE") {
        $("#ready2").css("background-color", "green");
    } else {
        $("#ready2").css("background-color", "red");
    }

    $("#points3 span").text(backendData.player3_points);
    $("#answer3 span").text(backendData.player3_answer);
    if (backendData.player3_ready == "TRUE") {
        $("#ready3").css("background-color", "green");
    } else {
        $("#ready3").css("background-color", "red");
    }

    textFit($('.answer div'), { alignVert: true, minFontSize: convertRemToPixels(0.4), maxFontSize: convertRemToPixels(0.8), multiLine: true })
    textFit($('.points div'), { alignVert: true, alignHoriz: true, minFontSize: convertRemToPixels(0.4), maxFontSize: convertRemToPixels(0.8) })
}



function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}