    function checkEmpty(input) {
        if (input.value.trim() === "") {
            input.classList.add("empty");
        } else {
            input.classList.remove("empty");
        }
    }

