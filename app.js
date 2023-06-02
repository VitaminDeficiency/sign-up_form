function Validator(option) {
  // option có key form và rules
  // console.log(option.form); // #form-1

  // Lấy ra DOM từ id form-1
  var formElement = document.querySelector(option.form);

  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();

      isFormValid = true;

      option.rules.forEach((element) => {
        var inputElement = formElement.querySelector(element.selectorKey);
        var spanError =
          inputElement.parentElement.querySelector(".form-message");
        var isValid = validate(inputElement, element, spanError);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof option.onSubmit === "function") {
          // Chọn trường dữ liệu thông qua attribute name input
          var pickElementInput = formElement.querySelectorAll("[name]");

          //  Chuyển pickInput sang Array để sử dụng reduce
          var formValue = Array.from(pickElementInput).reduce(function (
            value,
            input
          ) {
            value[input.name] = input.value;
            return value;
          },
          {});
          option.onSubmit(formValue);
        }
      }
    };

    // Lặp qua bên trong của key rules
    option.rules.forEach((element) => {
      // console.log(element.selectorKey);

      var inputElement = formElement.querySelector(element.selectorKey);

      // lấy ra thẻ cha từ thẻ con
      var spanError = inputElement.parentElement.querySelector(".form-message");

      if (inputElement) {
        // Trường hợp người dùng blur ra khỏi ô input
        inputElement.onblur = function () {
          validate(inputElement, element, spanError);
        };

        // Trường hợp người dùng đang nhập trong ô input
        inputElement.oninput = function () {
          spanError.innerHTML = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

function validate(inputElement, element, spanError) {
  // Khai báo biến errorMessage trong đây để cập nhật giá trị khi blur
  var errorMessage = element.test(inputElement.value);
  if (errorMessage) {
    spanError.innerHTML = errorMessage;
    inputElement.parentElement.classList.add("invalid");
  } else {
    spanError.innerHTML = "";
    inputElement.parentElement.classList.remove("invalid");
  }
  return !errorMessage;
}

// Định nghĩa quy tắc (luật) bên trong Rules
function isRequired(selector) {
  return {
    selectorKey: selector,

    // Kiểm tra chuỗi value rồng hay không
    test: function (value) {
      return value.trim() ? undefined : "Can't be left blank";
    },
  };
}

function isEmail(selector) {
  return {
    selectorKey: selector,

    // Kiểm tra chuỗi value có là email hay không
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Can't be left blank";
    },
  };
}

function isPassword(selector) {
  return {
    selectorKey: selector,

    // Kiểm tra chuỗi value có là email hay không
    test: function (value) {
      return value.length < 6 ? "Length must be 6" : undefined;
    },
  };
}

function isRePassword(selector, password) {
  return {
    selectorKey: selector,
    // Kiểm tra chuỗi value có là email hay không
    test: function (value) {
      return value === password() ? undefined : "Do not same password";
    },
  };
}
