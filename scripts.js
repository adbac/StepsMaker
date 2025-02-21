const rangeMinInput = document.getElementById("rangeMin");
const rangeMaxInput = document.getElementById("rangeMax");
const stepsInput = document.getElementById("steps");
const roundCheckbox = document.getElementById("round");
const outputGroup = document.getElementsByName("output");
const preview = document.getElementById("preview");
const copyButton = document.getElementById("copy");

formattingDict = {
    "spaceSepList": {
        sep: " ",
        leading: "",
        trailing: ""
    },
    "commaSepList": {
        sep: ", ",
        leading: "",
        trailing: ""
    },
    "onePerLine": {
        sep: "\n",
        leading: "",
        trailing: ""
    },
    "pythonList": {
        sep: ", ",
        leading: "[",
        trailing: "]"
    }
}

function getSelectedRadioButtonID(nameQueryResult) {
    for (i = 0; i < nameQueryResult.length; i++) {
        if (nameQueryResult[i].checked) {
            return nameQueryResult[i].id;
        }
    }
    return null;
}

function makeSteps(min=0, max=10, n=10, round=false) {
    const step = (max - min) / (n - 1);
    const steps = [];
    for (let i = 0; i < n; i++) {
        const value = min + i * step;
        steps.push(round ? Math.round(value) : value);
    }
    return steps;
}

function formatSteps(steps, sep=" ", leading="", trailing="") {
    return leading + steps.join(sep) + trailing;
}

function updateOutput() {
    const min = Number(rangeMinInput.value);
    const max = Number(rangeMaxInput.value);
    const n = Number(stepsInput.value);
    const round = roundCheckbox.checked;
    const steps = makeSteps(min, max, n, round);
    const output = getSelectedRadioButtonID(outputGroup);
    const {sep, leading, trailing} = formattingDict[output];
    const formatted = formatSteps(steps, sep, leading, trailing);
    preview.value = formatted;
}

for (const input of [rangeMinInput, rangeMaxInput, stepsInput, roundCheckbox, ...outputGroup]) {
    input.addEventListener("input", updateOutput);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

copyButton.addEventListener("click", () => {
    copyToClipboard(preview.value);
});