function check60() {
    var check60status = document.getElementById("check60").checked;
    document.getElementById("check60").checked = check60status;
    localStorage.setItem('check60', check60status);
}

function check61() {
    var check61status = document.getElementById("check61").checked;
    document.getElementById("check61").checked = check61status;
    localStorage.setItem('check61', check61status);
}

function check62() {
    var check62status = document.getElementById("check62").checked;
    document.getElementById("check62").checked = check62status;
    localStorage.setItem('check62', check62status);
}

function check63() {
    var check63status = document.getElementById("check63").checked;
    document.getElementById("check63").checked = check63status;
    localStorage.setItem('check63', check63status);
}

function check64() {
    var check64status = document.getElementById("check64").checked;
    document.getElementById("check64").checked = check64status;
    localStorage.setItem('check64', check64status);
}

function check65() {
    var check65status = document.getElementById("check65").checked;
    document.getElementById("check65").checked = check65status;
    localStorage.setItem('check65', check65status);
}

function check66() {
    var check66status = document.getElementById("check66").checked;
    document.getElementById("check66").checked = check66status;
    localStorage.setItem('check66', check66status);
}

function check67() {
    var check67status = document.getElementById("check67").checked;
    document.getElementById("check67").checked = check67status;
    localStorage.setItem('check67', check67status);
}

function check68() {
    var check68status = document.getElementById("check68").checked;
    document.getElementById("check68").checked = check68status;
    localStorage.setItem('check68', check68status);
}

function check69() {
    var check69status = document.getElementById("check69").checked;
    document.getElementById("check69").checked = check69status;
    localStorage.setItem('check69', check69status);
}

function check70() {
    var check70status = document.getElementById("check70").checked;
    document.getElementById("check70").checked = check70status;
    localStorage.setItem('check70', check70status);
}

function check71() {
    var check71status = document.getElementById("check71").checked;
    document.getElementById("check71").checked = check71status;
    localStorage.setItem('check71', check71status);
}

function check72() {
    var check72status = document.getElementById("check72").checked;
    document.getElementById("check72").checked = check72status;
    localStorage.setItem('check72', check72status);
}

function check73() {
    var check73status = document.getElementById("check73").checked;
    document.getElementById("check73").checked = check73status;
    localStorage.setItem('check73', check73status);
}

function check74() {
    var check74status = document.getElementById("check74").checked;
    document.getElementById("check74").checked = check74status;
    localStorage.setItem('check74', check74status);
}

function check75() {
    var check75status = document.getElementById("check75").checked;
    document.getElementById("check75").checked = check75status;
    localStorage.setItem('check75', check75status);
}

function check76() {
    var check76status = document.getElementById("check76").checked;
    document.getElementById("check76").checked = check76status;
    localStorage.setItem('check76', check76status);
}

function check77() {
    var check77status = document.getElementById("check77").checked;
    document.getElementById("check77").checked = check77status;
    localStorage.setItem('check77', check77status);
}

function check78() {
    var check78status = document.getElementById("check78").checked;
    document.getElementById("check78").checked = check78status;
    localStorage.setItem('check78', check78status);
}

function check79() {
    var check79status = document.getElementById("check79").checked;
    document.getElementById("check79").checked = check79status;
    localStorage.setItem('check79', check79status);
}

function check80() {
    var check80status = document.getElementById("check80").checked;
    document.getElementById("check80").checked = check80status;
    localStorage.setItem('check80', check80status);
}

function check81() {
    var check81status = document.getElementById("check81").checked;
    document.getElementById("check81").checked = check81status;
    localStorage.setItem('check81', check81status);
}

function check82() {
    var check82status = document.getElementById("check82").checked;
    document.getElementById("check82").checked = check82status;
    localStorage.setItem('check82', check82status);
}

function check83() {
    var check83status = document.getElementById("check83").checked;
    document.getElementById("check83").checked = check83status;
    localStorage.setItem('check83', check83status);
}

document.addEventListener('DOMContentLoaded', function() {
    check60();
    check61();
    check62();
    check63();
    check64();
    check65();
    check66();
    check67();
    check68();
    check69();
    check70();
    check71();
    check72();
    check73();
    check74();
    check75();
    check76();
    check77();
    check78();
    check79();
    check80();
    check81();
    check82();
    check83();
});

/*document.getElementById('myCheckbox').addEventListener('change', function() {
    // Armazena o estado do checkbox no localStorage
    localStorage.setItem('checkboxState', this.checked);
}); */

// Inicializa o estado do checkbox com o valor armazenado no localStorage (se existir)
window.addEventListener('load', function() {
    const checkboxState = localStorage.getItem('checkboxState');
    if (checkboxState !== null) {
        document.getElementById('myCheckbox').checked = JSON.parse(checkboxState);
    }
});