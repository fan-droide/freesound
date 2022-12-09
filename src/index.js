require('dotenv').config()
function createButton() {
    const btn = document.createElement('a')
    btn.innerHTML = 'LOGIN'
    btn.setAttribute('class', 'login-button')
    btn.setAttribute(
        'href', 
        'https://freesound.org/apiv2/oauth2/authorize/?client_id='+process.env.CLIENT_ID+'&response_type=code&state=xyz'
    )
    
    document.getElementById('error').appendChild(btn)
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const theCode = urlParams.get('code')


if (theCode !==null) {
    /* OPTION 1 */
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://freesound.org/apiv2/oauth2/access_token/', true);    
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,                
        code: theCode,
        grant_type: 'authorization_code'
    }));
     /* OPTION 2 */
    fetch('https://freesound.org/apiv2/oauth2/access_token/', {
        method: 'POST',   
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,                
                code: theCode,
                grant_type: 'authorization_code'
            })
    }).then(response => response.json()).then(response => console.log(JSON.stringify(response)))
}
createButton()