const apikey = "e2b76438ef0eac2ae4b661fef4e5c7ea"

//Grab 25 random quotes and display them on browser page
document.getElementById("quoteSubmit").addEventListener("click", function (event) {
    event.preventDefault(); //Don't submit to server, let me do something first

    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token token=' + apikey);
    myHeaders.append('Content-Type', 'application/json');

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    let myRequest = new Request('https://favqs.com/api/quotes/', myInit);

    fetch(myRequest).then(function (response) {
        return response.json();
    }).then(function (myjson) {
        console.log(myjson);

        let results = ""; //create dynamic javascript here
        results += "<div><h2>25 Quotes</h2><hr>";
        for (let i = 0; i < myjson.quotes.length; i++) {
            results += "<p>" + myjson.quotes[i].body + "</p>";
            results += "<h3>--" + myjson.quotes[i].author + "</h3><hr>";
        }
        results += "</div>";
        document.getElementById("quoteResults").innerHTML = results;
    });
});

//Grab quotes that relate to a specific tag and display them on the browser page
document.getElementById("quoteFilterSubmit").addEventListener("click", function (event) {
    tag = document.getElementById("quoteFilterInput").value;
    event.preventDefault();
    if (tag === "")
        return; //Do nothing
    console.log(tag);
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token token=' + apikey);
    myHeaders.append('Content-Type', 'application/json');

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    let myRequest = new Request('https://favqs.com/api/quotes/?filter=' + tag + '&type=tag', myInit);

    fetch(myRequest).then(function (response) {
        return response.json();
    }).then(function (myjson) {
        console.log(myjson);

        let results = ""; //create dynamic javascript here
        results += "<div><h2>" + tag.charAt(0).toUpperCase() + tag.slice(1) + " Quotes</h2><hr>";
        for (let i = 0; i < myjson.quotes.length; i++) {
            if (myjson.quotes[i].body !== undefined) {
                results += "<p>" + myjson.quotes[i].body + "</p>";
                results += "<h3>--" + myjson.quotes[i].author + "</h3><hr>";
            }
        }
        results += "</div>";
        document.getElementById("quoteResults").innerHTML = results;
    });
});