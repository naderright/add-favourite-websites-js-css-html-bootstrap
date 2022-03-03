
var nameWeb = document.getElementById("name-web");
var urlWeb = document.getElementById("web-url");
var warningNameSite = document.getElementById("warning-name");
var warningUrlSite = document.getElementById("warning-url");

var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

warningNameSite.style.display = "none";
warningUrlSite.style.display = "none";

var container;
if (localStorage.getItem("listWEB") != null) {
    container = JSON.parse(localStorage.getItem("listWEB"));
    displayWeb()
} else {
    container = [];
};

function addWeb() {
    warningNameSite.style.display = "none";
    warningUrlSite.style.display = "none";
    if (nameWeb.value == "" && urlWeb.value == "") {
        warningNameSite.style.display = "block";
        warningUrlSite.style.display = "block";
    }
    else if (nameWeb.value == "") {
        warningNameSite.style.display = "block";
    }
    else if (urlWeb.value == "") {
        warningUrlSite.style.display = "block";
    }
    else {
        if (regex.test(urlWeb.value)== true) {
            var website = {
                web: nameWeb.value,
                url: urlWeb.value,
            };
            container.push(website);
            console.log(container);
            localStorage.setItem("listWEB", JSON.stringify(container));
            displayWeb();
            clear();
        } else {
            warningUrlSite.innerHTML = "enter valid url";
            warningUrlSite.style.display = "block";
            warningUrlSite.style.color = "#dc3545";
            warningUrlSite.style.fontWeight = "700";
            warningUrlSite.style.textAlign = "center";
            warningUrlSite.style.fontSize = "17px";
        }

    }

};

// display table
function displayWeb() {
    var temp = ``;
    for (var i = 0; i < container.length; i++) {
        temp += `<tr>
         <td>${i + 1}</td>
         <td>${container[i].web}</td>
         <td>${container[i].url}</td>
         <td><button class="btn btn-warning"><a href="${container[i].url}" target="_blanck">Visite</a></button></td>
         <td><button class="btn btn-danger" onclick="removeTr(${i})">Delete</button></td>
     </tr>`;
    };
    document.getElementById("table-display").innerHTML = temp;
};

// delete value of input
function clear() {
    nameWeb.value = "";
    urlWeb.value = "";
};

// delete tr table
function removeTr(index) {
    container.splice(index, 1);
    localStorage.setItem("listWEB", JSON.stringify(container));
    displayWeb()
}