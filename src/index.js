require('dotenv').config()
function createButton() {
    const btn = document.createElement('a')
    btn.innerHTML = 'LOGIN'
    btn.setAttribute('class', 'login-button')
    btn.setAttribute(
        'href',
        'https://freesound.org/apiv2/oauth2/authorize/?client_id=' + process.env.CLIENT_ID + '&response_type=code&state=xyz'
    )

    document.getElementById('error').appendChild(btn)
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const theCode = urlParams.get('code')


if (theCode !== null) {

    /* OPTION 3 */
    fetch("https://freesound.org/apiv2/oauth2/access_token/?client_id=" 
            + process.env.CLIENT_ID 
            + "&client_secret=" 
            + process.env.CLIENT_SECRET 
            + "&grant_type=authorization_code&code=" 
            + theCode + "", {
        method: "POST"
    }).then(response => response.json()).then(response => console.log(JSON.stringify(response)))
}
createButton()