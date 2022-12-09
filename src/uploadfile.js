/* Create a form dynamically */
export function createUploadForm(accessToken) {

    const errorDiv = document.getElementById('error')

    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('id', 'theForm')

    const inputFile = document.createElement('input')
    inputFile.setAttribute('type', 'file')
    inputFile.setAttribute('id', 'fileInput')

    const submitButton = document.createElement('input')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('value', 'Submit')

    form.appendChild(inputFile)
    form.appendChild(submitButton)
    errorDiv.appendChild(form)

    form.addEventListener('submit', (event) => {        
        event.preventDefault()
        fileReader(fileInput.files[0], accessToken)
    })
}

function fileReader(thefile, tokenInfo) {

    const file = {
        dom: document.getElementById('fileInput'),
        binary: null
    }
    const reader = new FileReader()

    reader.addEventListener('load', () => {        
        file.binary = reader.result
    })

    reader.addEventListener('loadend', () => {        
        sendData(file, tokenInfo)
    })
    if (thefile) {    
        reader.readAsBinaryString(thefile)
    }
}
function sendData(file, tokenInfo) {

    const req = new XMLHttpRequest()

    const formData = new FormData()
    const dataFormValue = file.dom.files[0]
    formData.append('audiofile', dataFormValue)
    formData.append('description', 'Test description')
    formData.append('tags', 'tag1 tag2 tag3 cool-tag4')
    formData.append('license', 'Creative Commons 0')

    req.addEventListener('error', (event) => {
        alert('Oops! Something went wrong.')
    })
    req.onreadystatechange = function (eventvt) {
        if (req.readyState == 4) {
            alert("Check the web browser's console for more details")           
        }
    }
    req.open('POST', 'https://freesound.org/apiv2/sounds/upload/')
    req.setRequestHeader('Authorization', `Bearer ${tokenInfo.access_token}`)
    req.send(formData)
}