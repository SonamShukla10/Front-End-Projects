function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    if(Clients.checkForName(formText)) {
      fetch('http://localhost:8000/test', {
        method: 'POST',
        mode: 'cors',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text" formText})
      })
      .then(res => res.json())
      .then(function(res) {
        document.getElementById('polarity').innerHTML = res.score_tag
        document.getElementById("agreement").innerHTML = res.agreement
        document.getElementById("subjectivity").innerHTML = res.subjectivity
        document.getElementById("confidence").innerHTML = res.confidence
        document.getElementById("texting").innerHTML = res.text
    })
    } else {
        alert('Invalid!');
    }
      }


export { handleSubmit }
