//calculator
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

const operators = ["+", "-", "*", "/"];

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;
        const lastChar = display.value.slice(-1);

        // CLEAR
        if (value === "C") {
            display.value = "";
            return;
        }

        // DELETE
        if (value === "DEL") {
            display.value = display.value.slice(0, -1);
            return;
        }

        // EQUAL (=)
        if (value === "=") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
            return;
        }

        // 🚫 Prevent two operators in a row
        if (operators.includes(value) && operators.includes(lastChar)) {
            return; // ignore second operator
        }

        // 🚫 Prevent multiple decimals in the same number
        if (value === ".") {
            // Split current expression by operators to get the LAST number
            let lastNumber = display.value.split(/[\+\-\*\/]/).pop();
            if (lastNumber.includes(".")) {
                return; // ignore second dot
            }
        }

        // Append value normally
        display.value += value;
    });
});

