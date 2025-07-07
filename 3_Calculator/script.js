const addValue = (value) => {
  if (display.value === "Error") {
    display.value = '';
  }
  display.value += value;
};

const calculate = () => {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
};

const clearDisplay = () => {
  display.value = "";
};

const backStep = () => {
  display.value = display.value.slice(0, -1);
};
