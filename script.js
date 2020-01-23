var searchInput = document.querySelector(".header input");
var searchIsExpanded = false;
var database = {};

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        var retrievedDatabase = this.responseText;
        database = JSON.parse(retrievedDatabase);

    } else if (this.readyState == 4 && this.status != 200) {

        console.log("Error retrieving database.");

    }
}
request.open("GET", "database.json", false);
request.send();


searchInput.oninput = refreshResults;

function refreshResults() {

    if (searchInput.value !== "") {

        var results = searchFor(searchInput.value);

        clearSearchResults();
        showSearchResults(results);

        if (!searchIsExpanded) expandSearchResults();

    } else if (searchInput.value === "") {

        clearSearchResults();
        setTimeout(function () {

            if (searchInput.value == "") {
                collapseSearchResults();
            }

        }, 5000);

    }

}

function expandSearchResults() {

    document.querySelector(".header div").classList.add("expanded");
    document.querySelector(".header input").classList.add("expanded");
    var h1 = document.querySelector(".header h1");
    h1.style.opacity = 0;
    setTimeout(function () {

        h1.classList.add("expanded");
        h1.style.opacity = 1;

    }, 300);

    var resultsPanel = document.querySelector(".resultsPanel");
    resultsPanel.style.display = "block";
    setTimeout(function () {
        resultsPanel.style.top = "15%";
    }, 50);

    searchIsExpanded = true;

}

function collapseSearchResults() {

    document.querySelector(".header div").classList.remove("expanded");
    document.querySelector(".header input").classList.remove("expanded");
    var h1 = document.querySelector(".header h1");
    h1.style.opacity = 0;
    setTimeout(function () {

        h1.classList.remove("expanded");
        h1.style.opacity = 1;

    }, 300);

    var resultsPanel = document.querySelector(".resultsPanel");
    resultsPanel.style.top = "100%";
    setTimeout(function () {
        resultsPanel.style.display = "none";
    }, 400);

    searchIsExpanded = false;

}

function searchFor(searchTerm) {

    var keys = Object.keys(database);
    var matches = [];

    for (var i = 0; i < keys.length; i++) {

        var currentItem = database[keys[i]];
        var name = currentItem.name.toLowerCase();
        var filteredSearchTerm = searchTerm.toLowerCase();

        if (name.indexOf(filteredSearchTerm) != -1) matches.push(currentItem);

    }
    console.log(matches);
    return matches;

}

function clearSearchResults() {

    document.querySelector(".resultsPanel").innerHTML = "";

}

function showSearchResults(searchResults) {

    var resultsPanel = document.querySelector(".resultsPanel");
    var keys = Object.keys(searchResults);

    if (searchResults[0]) {

        for (var i = 0; i < searchResults.length; i++) {

            var aElement = document.createElement("div");
            var element = document.createElement("div");
            var currentResult = searchResults[keys[i]];

            element.classList.add("searchResult");
            (function (currentResult) {
                aElement.href = currentResult.address;
            })(currentResult)
            element.innerHTML = "<h1>" + currentResult.name + "</h1><p>" + currentResult.description + "</p>";
            
            aElement.appendChild(element);
            resultsPanel.appendChild(aElement);

        }

    } else {
        resultsPanel.innerHTML = "<p class='noResultsText'>No Results</p><p class='suggestLink'><a href='/suggest.html'>Suggest a Result</a></p>";
    }

}

function openOptions () {
    
    document.querySelector(".resultsPanel").innerHTML = "<h1>Options</h1>";
    expandSearchResults();
    
}

window.onload = () => {
    let banner = document.querySelector('[alt="www.000webhost.com"]').parentNode.parentNode;
    banner.parentNode.removeChild(banner);
}
