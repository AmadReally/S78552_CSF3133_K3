function validateForm() {
    // Read the value typed into the First Name field
    let fname = document.forms["myForm"]["fname"].value;
    // Case 1: empty field -> show an alert and stop the form from submitting
    if (fname === "") {
        alert("First Name must be filled out.");
        return false;
    }
    // Case 2: field filled in -> the form submits normally
}
