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
    var profilePictureURL = profilePicture ? URL.createObjectURL(profilePicture) : "";
    var uniquePath = "resumes/".concat(name.replace(/\s+/g, "_"), "_cv.html");
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        var resumeOutput = "\n      <h2> Resume </h2>\n      ".concat(profilePictureURL
            ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilepicture\">")
            : "", "\n      <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name, "</span></p>\n      <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n      <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n      <h3> Education </h3>\n      <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n      <h3> Experience </h3>\n      <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n      <h3> Skills </h3>\n      <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n    ");
        var downloadLink = document.createElement("a");
        downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = "Download Your Resume";
        var resumeOutputElement = document.getElementById("ResumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(downloadLink);
            makeEditable();
        }
        else {
            console.log("The Resume Output Element is missing.");
        }
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
