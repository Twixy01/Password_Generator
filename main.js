var displayLen = 0;

document.getElementById("len").addEventListener("change", function () {
    let len = parseInt(document.getElementById("len").value);
    displayLen = len;
    document.getElementById("display").innerText = displayLen;
});

function contains(id) {
    return id.checked;
}

document.getElementById("gen").addEventListener("click", function () {
    let password = "";
    let len = parseInt(document.getElementById("len").value);

    let containsCap = contains(document.getElementById("nagybetu"));
    let containsNum = contains(document.getElementById("szam"));
    let containsSpec = contains(document.getElementById("spec"));

    let array = [
        'a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h',
        'i', 'í', 'j', 'k', 'l', 'm', 'n', 'o', 'ó', 'ö',
        'ő', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'ű',
        'v', 'w', 'x', 'y', 'z'
    ];

    let uppercase = [
        'A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H',
        'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö',
        'Ő', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű',
        'V', 'W', 'X', 'Y', 'Z'
    ];
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let specials = ['!', '@', '#', '$', '%', '&', '*'];

    password = generate(len, array, array);

    if (containsCap) {
        if (!containsNum && !containsSpec) {
            merge(array, uppercase); // only uppercase
        } else if (containsNum && !containsSpec) {
            merge(array, uppercase, numbers) //uppercase and numbers....
        } else if (containsSpec && !containsNum) {
            merge(array, uppercase, specials)
        } else if (containsNum && containsSpec) {
            merge(array, uppercase, numbers, specials)
        }
    } else if (containsNum) {
        if (!containsCap && !containsSpec) {
            merge(array, numbers);
        } else if (containsSpec && !containsCap) {
            merge(array, numbers, specials)
        }
    } else if (containsSpec) {
        merge(array, specials);
    }

    function merge(mainArray, ...arrays) {
        arrays.forEach(array => {
            mainArray.push(...array);
        });
        password = generate(len, mainArray, mainArray, ...arrays);
    }
    
    document.getElementById("passDisplay").value = password;
});

function generate(len, array, ...feltetelek) {
    let password;
    let helyes;

    while (true) {
        password = "";
        for (let i = 0; i < len; i++) {
            let random = Math.floor(Math.random() * array.length);
            password += array[random];
        }

        helyes = feltetelek.every(feltetel => feltetel.some(element => password.includes(element)));

        if (helyes) {
            break;
        }
    }

    return password;
}

document.getElementById("copy").addEventListener("click", function () {
    let copytext = document.getElementById("passDisplay");
    copytext.select();
    navigator.clipboard.writeText(copytext.value);
});

/*function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}*/
