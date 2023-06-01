function Validator(option) {
  // option có key form và rules
  // console.log(option.form); // #form-1

  // Lấy ra DOM từ id form-1
  var formElement = document.querySelector(option.form);

  if (formElement) {
    // Lặp qua bên trong của key rules
    option.rules.forEach((element) => {
      // console.log(element.selectorKey);

      var inputElement = formElement.querySelector(element.selectorKey);

      // lấy ra thẻ cha từ thẻ con
      var spanError = inputElement.parentElement.querySelector(".form-message");

      if (inputElement) {
        // Trường hợp người dùng blur ra khỏi ô input
        inputElement.onblur = function () {
          // Khai báo biến errorMessage trong đây để cập nhật giá trị khi blur
          var errorMessage = element.test(inputElement.value);
          console.log(errorMessage);
          if (errorMessage) {
            spanError.innerHTML = errorMessage;
            inputElement.parentElement.classList.add("invalid");
          } else {
            spanError.innerHTML = "";
            inputElement.parentElement.classList.remove("invalid");
          }
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
