const toggleSkillCheckbox = document.getElementById(
  "Toggle-Skill"
) as HTMLInputElement;
const skillSection = document.getElementById("Skill-Section") as HTMLElement;

toggleSkillCheckbox.addEventListener("change", function () {
  if (toggleSkillCheckbox.checked) {
    skillSection.style.display = "block";
  } else {
    skillSection.style.display = "none";
  }
});

function generateResume(e: Event): void {
  e.preventDefault();
  const profilePictureInput = document.getElementById("profilepicture") as HTMLInputElement;
  const nameElement = document.getElementById("name") as HTMLInputElement;
  const emailElement = document.getElementById("email") as HTMLInputElement;
  const phoneElement = document.getElementById("phonenumber") as HTMLInputElement;
  const educationElement = document.getElementById("education") as HTMLTextAreaElement;
  const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
  const skillsElement = document.getElementById("skill") as HTMLTextAreaElement;

  const name = nameElement.value;
  const email = emailElement.value;
  const phone = phoneElement.value;
  const education = educationElement.value;
  const experience = experienceElement.value;
  const skills = skillsElement.value;

  const profilePicture = profilePictureInput.files?.[0];
  const profilePictureURL = profilePicture ? URL.createObjectURL(profilePicture) : "";

  const uniquePath = `resumes/${name.replace(/\s+/g, "_")}_cv.html`;

  if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
    const resumeOutput = `
      <h2> Resume </h2>
      ${
        profilePictureURL
          ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilepicture">`
          : ""
      }
      <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
      <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
      <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
      <h3> Education </h3>
      <p id="edit-education" class="editable">${education}</p>
      <h3> Experience </h3>
      <p id="edit-experience" class="editable">${experience}</p>
      <h3> Skills </h3>
      <p id="edit-skills" class="editable">${skills}</p>
    `;

    const downloadLink = document.createElement("a");
    downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = "Download Your Resume";

    const resumeOutputElement = document.getElementById("ResumeOutput") as HTMLElement;
    if (resumeOutputElement) {
      resumeOutputElement.innerHTML = resumeOutput;
      resumeOutputElement.appendChild(downloadLink);
      makeEditable();
    } else {
      console.log("The Resume Output Element is missing.");
    }
  }
}

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}

