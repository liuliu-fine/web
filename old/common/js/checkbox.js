function selectAll(checkboxName, checked) {
    j("input[type='checkbox'][name='" + checkboxName + "']").attr("checked", checked);
}

function selectCheckbox(checkboxName, value) {
    j("input[type='checkbox'][name='" + checkboxName + "'][value!='" + value + "']").attr("checked", false);
    j("input[type='checkbox'][name='" + checkboxName + "'][value='" + value + "']").attr("checked", true);
}

function isSelect(checkboxName) {
    var checked = false;
    j("input[type='checkbox'][name='" + checkboxName + "']").each(function() {
        if (this.checked == true) {
            checked = true;
        }
    });
    return checked;
}

function getCheckboxValue(checkboxName) {
    var value = "";
    j("input[type='checkbox'][name='" + checkboxName + "']").each(function() {
        if (this.checked == true) {
            value += "," + this.value;
        }
    });
    if (value.length > 0) {
        value = value.substr(1);
    }
    return value;
}