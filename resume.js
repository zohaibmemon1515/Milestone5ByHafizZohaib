var toggleSkillCheckbox = document.getElementById("Toggle-Skill");
var skillSection = document.getElementById("Skill-Section");
toggleSkillCheckbox.addEventListener("change", function () {
    if (toggleSkillCheckbox.checked) {
        skillSection.style.display = "block";
    }
    else {
        skillSection.style.display = "none";
    }
});
function generateResume(e) {
    var _a;
    e.preventDefault();
    var profilePictureInput = document.getElementById("profilepicture");
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phonenumber");
    var educationElement = document.getElementById("education");
    var experienceElement = document.getElementById("experience");
    var skillsElement = document.getElementById("skill");
    var name = nameElement.value;
    var email = emailElement.value;
    var phone = phoneElement.value;
    var education = educationElement.value;
    var experience = experienceElement.value;
    var skills = skillsElement.value;
    var profilePicture = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var profilePictureURL = profilePicture
        ? URL.createObjectURL(profilePicture)
        : "";
    var uniquePath = "resumes/".concat(name.replace(/\s+/g, "_"), "_cv.html");
    if (nameElement &&
        emailElement &&
        phoneElement &&
        educationElement &&
        experienceElement &&
        skillsElement) {
        var resumeOutput = "\n      <h2> Resume </h2>\n      ".concat(profilePictureURL
            ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilepicture\">")
            : "", "\n      <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name, "</span></p>\n      <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n      <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n      <h3> Education </h3>\n      <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n      <h3> Experience </h3>\n      <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n      <h3> Skills </h3>\n      <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n\n      <button type=\"button\" id=\"downloadResume\" onclick=\"Printtopdf()\">Download Resume</button>\n    ");
        var resumeOutputElement = document.getElementById("ResumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        }
        else {
            console.log("The Resume Output Element is missing.");
        }
    }
}
function Printtopdf() {
    var _a;
    var resumeOutputElement = (_a = document.getElementById("ResumeOutput")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (resumeOutputElement) {
        // Create a new window for the print preview
        var printWindow = window.open("", "", "height=600,width=800");
        if (printWindow) {
            // Set up the print window's document with the content
            printWindow.document.open();
            printWindow.document.write("\n              <html>\n              <head>\n                  <title>Print Resume</title>\n                  <style>\n                      /* Add any print-specific styles here */\n                      body { font-family: Arial, sans-serif; }\n                  </style>\n              </head>\n              <body onload=\"window.print();window.close();\">\n                  ".concat(resumeOutputElement, "\n              </body>\n              </html>\n          "));
            printWindow.document.close();
        }
        else {
            console.error("Failed to open print window.");
        }
    }
    else {
        console.error("Resume output element not found.");
    }
}
function makeEditable() {
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement("input");
                input_1.type = "text";
                input_1.value = currentValue;
                input_1.classList.add("editing-input");
                input_1.addEventListener("blur", function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = "inline";
                    input_1.remove();
                });
                currentElement.style.display = "none";
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
