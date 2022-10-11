const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput([username, email, password, confirmPassword]);
  checkUsernameLength(username, 5, 16);
  checkUsernameLength(password, 8, 16);
  validateEmail(email);
  validatePassword(confirmPassword);
});

function checkInput(allInput) {
  allInput.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check Username lenght
function checkUsernameLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

// validate email
function validateEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is Invalid");
  }
}

// validate password and confirm password
function validatePassword(input) {
  if (confirmPassword.value !== password.value) {
    showError(input, "Password does not match");
  }
}

// show error message
function showError(input, message) {
  const formInput = input.parentElement;
  formInput.className = "form-input error";
  const small = formInput.querySelector("small");
  small.innerText = message;
  small.style.visibility = "visible";
}

// show success message
function showSuccess(input) {
  const formInput = input.parentElement;
  formInput.className = "form-input success";
  const small = formInput.querySelector("small");
  small.style.visibility = "hidden";
}

// get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
