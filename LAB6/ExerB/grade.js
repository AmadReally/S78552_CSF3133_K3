// ==========================================================
// grade.js - Student Grade Calculator
// ==========================================================
// PART 1: ERRORS FOUND (line numbers refer to the given code in the question)
//
// Error 1 (grade.html, Line 9): onsubmit="checkMark()" has no "return", so returning false
//   did not stop the form. The page reloaded and the result disappeared
//   -> fixed to onsubmit="return checkMark()".
// Error 2 (grade.html, Line 17): onclick="showtable()" calls a function that does not exist
//   (JavaScript is case sensitive, the function is showTable) -> fixed to showTable().
// Error 3 (grade.html, Line 19): <script src="grades.js"> but the file is grade.js, so no
//   code was loaded and nothing happened when the button was clicked -> fixed to grade.js.
// Error 4 (grade.js, Line 5): if (name = "") uses = (assign) instead of === (compare), so the
//   name was always replaced by an empty text and the check was wrong -> fixed to name === "".
// Error 5 (grade.js, Line 9): isNan() is not a function (the correct name is isNaN) -> fixed.
// Error 6 (grade.js, Line 14): mark < 0 && mark > 100 can never be true, so 150 was accepted
//   -> fixed to mark < 0 || mark > 100.
// Error 7 (grade.js, Line 28): getElementByID is wrong, the correct name is getElementById.
// Error 8 (grade.js, Line 30): style.colour is wrong, the correct property is style.color.
// Error 9 (grade.js, Line 31): return true let the form submit and reload the page, so the
//   result disappeared immediately -> fixed to return false (show the result, do not submit).
// Error 10 (grade.js, Line 38): the loop started at i = 1, so grade A (index 0) was missing
//   from the table -> fixed to i = 0.
// Error 11 (grade.js, Line 42): innerHtml is wrong, the correct property is innerHTML.
//
// PART 2: EXTENSIONS (each new part is explained with comments below)
// ==========================================================

// Make text safe before putting it into innerHTML
function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Case 1: empty name (Error 4 fixed: === instead of =)
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2, step 5: empty mark
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Case 2: not a number (Error 5 fixed: isNaN)
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Case 3: outside 0-100 (Error 6 fixed: || instead of &&)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Work out the grade
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Show the result (Error 7 fixed: getElementById)
    let resultBox = document.getElementById("result");
    resultBox.innerHTML = escapeHTML(name) + " got grade " + grade;

    // Part 2, step 6: colour by grade - green for A and B, orange for C, red for F
    // (Error 8 fixed: style.color)
    if (grade === "A" || grade === "B") {
        resultBox.style.color = "green";
    } else if (grade === "C") {
        resultBox.style.color = "orange";
    } else {
        resultBox.style.color = "red";
    }

    // Part 2, step 8: show the date and time the grade was checked
    document.getElementById("checkedOn").innerHTML = "Checked on: " + Date();

    // Error 9 fixed: return false so the page does not reload and the result stays
    return false;
}

// Part 2, step 7: Random Mark button - puts a whole number from 0 to 100 into the mark field
// Math.random() * 101 gives 0 to 100.99..., Math.floor() removes the decimals
function randomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    // Error 10 fixed: start at i = 0 so grade A is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</table>";
    // Error 11 fixed: innerHTML
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
