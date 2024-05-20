var displayLen = 0;

document.getElementById("len").addEventListener("change", function () {
    let len = parseInt(document.getElementById("len").value);
    displayLen = len;
    document.getElementById("display").innerText = displayLen;
});

function contains(id) {
    if (id.checked) {
        return true;
    }
    return false;
}

document.getElementById("gen").addEventListener("click", function () {
    let password = "";
    let len = parseInt(document.getElementById("len").value);

    let containsCap = contains(nagybetu);
    let containsNum = contains(szam);
    let containsSpec = contains(spec);


    let tomb = [
        'a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h',
        'i', 'í', 'j', 'k', 'l', 'm', 'n', 'o', 'ó', 'ö',
        'ő', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'ű',
        'v', 'w', 'x', 'y', 'z'
    ];

    let nagybetuk = [
        'A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H',
        'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö',
        'Ő', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű',
        'V', 'W', 'X', 'Y', 'Z'
    ];
    let szamok = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let speckok = ['!', '@', '#', '$', '%', '&', '*'];


    if (containsCap) {
        tomb.push.apply(tomb, nagybetuk);
    }
    if (containsNum) {
        tomb.push.apply(tomb, szamok);
    }
    if (containsSpec) {
        tomb.push.apply(tomb, speckok);
    }
    shuffle(tomb);

    password = generate(len, tomb);
    // while ("")
    // switch (password) {
    //     case containsCap && !tomb.includes(nagybetuk):
    //         generate(len, tomb);
    //         break;
    // }

    document.getElementById("passDisplay").value = password;
});

function shuffle(array) {
    let currentIndex = array.length - 1;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);

        [array[currentIndex], [array[randomIndex]]] = [array[randomIndex], [array[currentIndex]]]
        currentIndex--;
    }
}

function generate(len, tomb) {
    let password = "";
    for (var i = 0; i < len; i++) {
        var random = Math.floor(Math.random() * tomb.length);
        password += tomb[random];
    }
    return password;
}

document.getElementById("copy").addEventListener("click", function () {
    let copytext = document.getElementById("passDisplay");
    copytext.select();
    navigator.clipboard.writeText(copytext.value);

});