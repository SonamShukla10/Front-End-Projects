import checkName from './nameChecker';
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let eve = document.getElementById('error');

    const data = {
        formText
    }

    //checkForName(formText)

    //console.log("::: Form Submitted :::")
    if(Client.checkName(formText)) {


    fetch('http://localhost:8081/usertext', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formText })
    })
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message;
        document.getElementById('score').innerHTML = res.scores;
        document.getElementById('vitriol').innerHTML = res.vitriol;
        document.getElementById('subject').innerHTML = res.subjects;
    })
} else {
  alert('Please Input a Valid Address!')
};

}
export { handleSubmit }
