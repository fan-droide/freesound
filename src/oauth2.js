import { createUploadForm } from './uploadfile'
require('dotenv').config()

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const theCode = urlParams.get('code')

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
function removeLoginButton(){
    const elements = document.getElementsByClassName('login-button')    
    elements[0].parentNode.removeChild(elements[0])
}

function successOAuth(tokenInfo) {
    removeLoginButton()
    createUploadForm(tokenInfo)
}

if (theCode !== null) {

    fetch('https://freesound.org/apiv2/oauth2/access_token/?client_id='
        + process.env.CLIENT_ID
        + '&client_secret='
        + process.env.CLIENT_SECRET
        + '&grant_type=authorization_code&code='
        + theCode + '', {
        method: 'POST'
    }).then(response => response.json()).then(response => {
        successOAuth(response)
    })
}

createButton()