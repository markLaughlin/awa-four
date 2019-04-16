function watchForm(){
    console.log("Form loaded; watchForm function ran; just waiting for the form to be submitted");
    $("#formOne").submit(function (event){
        event.preventDefault();
        let h = $(".inputOne").val();
        console.log("form submitted");
        getRepos(h);
    });
}

function getRepos(h){
    console.log("getRepos function ran");
    console.log(h);
    fetch(`https://api.github.com/users/${h}/repos`)
        .then(response => response.json())
        .then(responseJson => display(responseJson));
}

function display(responseJson){
    console.log("display function ran");
    r = responseJson;
    length = r.length;
    
    for(i=0; i< length; i++){
        let current = r[i].html_url;
        console.log(current);
        $(".displayHere").append(`${current}`);
    }

    offerReset()
}

function offerReset(){
    console.log("offerReset function ran");
    let resetOffer = `
    <p></p>
    <label for="resetButton">
        <button class="resetButton">Reset</>
    </label>
    `
    $(".resetHere").append(resetOffer);
    reset()
}

function reset(){
    console.log("reset function ran");
    $(".resetButton").click(function (event){
        console.log("reset button clicked");
        $(".displayHere").empty();
        $(".resetHere").empty();
        $("#formOne").trigger("reset");
    });
}

$(watchForm());