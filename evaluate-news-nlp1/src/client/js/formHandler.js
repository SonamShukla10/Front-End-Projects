import checkUrl from './nameChecker';

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    if(Client.checkForName(formText)) {
      fetch('http://localhost:8880/test', {
        method: 'POST',
        mode: 'cors',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text" formText})
      })
      .then(res => res.json())
      .then(function(res) {
        document.getElementById('scores').innerHTML = res.scores
        document.getElementById("agreement").innerHTML = res.agreement
        document.getElementById("subjects").innerHTML = res.subjects
        document.getElementById("confidence").innerHTML = res.confidence
        document.getElementById("texting").innerHTML = res.text
    })
    } else {
        alert('Invalid!');
    }
      }


export { handleSubmit }
