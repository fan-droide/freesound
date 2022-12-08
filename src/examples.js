/* Examples from: https://github.com/g-roma/freesound.js/blob/master/test.html */
import FreeSound from "freesound-client"

const freeSound = new FreeSound()

require('dotenv').config()

freeSound.setToken(process.env.CLIENT_SECRET)
        
const fields = 'id,name,url,analysis,username'
// Example 1
// Example of getting the info of a sound, querying for similar sounds (content based) and showing some analysis
// features. Both similar sounds and analysis features are obtained with additional requests to the api.
async function example1() {
    const sound = await freeSound.getSound(96541)
    let  msg = ''    
    msg = '<h3>Getting info of sound: ' + sound.name + '</h3>'
    msg += '<strong>Url:</strong> ' + sound.url + '<br>'
    msg += '<strong>Description:</strong> ' + sound.description + '<br>'
    msg += '<strong>Tags:</strong><ul>'
    for (i in sound.tags){
        msg += '<li>' + sound.tags[i] + '</li>'
    }
    msg += '</ul><br>'
    msg += "<img src='" + sound.images.waveform_l + "'>"

    snd = new Audio(sound.previews['preview-hq-mp3'])
    msg += '<br><button onclick="snd.play()">play</button><button onclick="snd.pause()">pause</button><br><br>'
    displayMessage(msg,'resp1')    
    
    // When we have printed some sound info, ask for analysis
    const analysis = await sound.getAnalysis()
    
    msg += '<strong>Mfccs:</strong><ul>'
    for (i in analysis.lowlevel.mfcc.mean){
        msg += '<li>' + analysis.lowlevel.mfcc.mean[i] + '</li>'
    }
    msg += '</ul>'
    displayMessage(msg,'resp1')
    
    // When we have printed the analysis, ask for similar sounds
    const similarSounds = await sound.getSimilar()
    msg += '<strong>Similar sounds:</strong><ul>'                            
    for (let i =0;i<=10;i++){                     
        
        const item = await similarSounds.getItem(i)
        const snd = await freeSound.getSound(item.id)        
        msg += '<li>' + item.id + ': ' + snd.url + '</li>'
    }
    msg += '</ul>'
    displayMessage(msg,'resp1')
}



// Example 2
// Example of searching sounds: querying the freesound db for sounds and retrieving lowlevel descriptors
async function example2() {
    const query = 'violoncello'
    const page = 1
    const filter = 'tag:tenuto duration:[1.0 TO 15.0]'
    const sort = 'rating_desc'
    const descriptors = 'lowlevel.spectral_centroid'
    const sounds = await freeSound.textSearch(query, {page:page, filter:filter, sort:sort, fields:fields, descriptors: descriptors})
    let msg = ''            
    msg = '<h3>Searching for: ' + query + '</h3>'
    msg += 'With filter: ' + filter +' and sorting: ' + sort + '<br>'
    msg += 'Num results: ' + sounds.count + '<br><ul>'
    for (i =0;i<=10;i++){  
        const snd = sounds.getSound(i)
        msg += '<li>' + snd.name + ' by ' + snd.username + ' with spectral centroid mean value: ' + snd.analysis.lowlevel.spectral_centroid.mean.toString() + '</li>'
    }
    msg += '</ul>'
    displayMessage(msg,'resp2')
}


// Example 3
// Example of content based searching
async function example3() {
    const t = '.lowlevel.pitch_salience.mean:1.0 .lowlevel.pitch.mean:440'
    const f = '.lowlevel.pitch.var:[* TO 20] AND .metadata.audio_properties.length:[1 TO 10]'
    const page_size  = 10

    const sounds = await freeSound.contentSearch({target:t,filter:f, page_size : page_size, fields:fields})
    let  msg = ''
    msg = '<h3>Content based searching</h3>'
    msg += 'Target: ' + t +'<br>'
    msg += 'Filter: ' + f +'<br>'
    msg += 'Fields: ' + fields +'<br>'
    msg += 'Num results: ' + sounds.count + '<br><ul>'
    msg += '<li> ---------- PAGE 1 ---------- </li>'
    for (i in sounds.results){                                        
        msg += '<li>' +  sounds.results[i].id+ ' | ' +
            sounds.results[i].name + ' | ' + sounds.results[i].url + '</li>'
    }
    msg += '</ul>'
    displayMessage(msg,'resp3')

    const nextPageSounds = await sounds.nextPage()
    msg += '<ul><li> ---------- PAGE 2 ---------- </li>'
    for (i in nextPageSounds.results){
        const j = parseInt(i)
        msg += '<li>' +  nextPageSounds.results[j].id.toString(10) + 
            ' | ' + nextPageSounds.results[j].name + ' | ' + nextPageSounds.results[j].url + '</li>'
    }
    msg += '</ul>'
    displayMessage(msg,'resp3')

}


// Example 4
// Example of geoquerying
async function example4() {
    const min_lat = 41.3265528618605
    const max_lat = 41.4504467428547
    const min_lon = 2.005176544189453
    const max_lon = 2.334766387939453
    filterString = "geotag:\"Intersects("+min_lon.toFixed(3)+" "+min_lat.toFixed(3)+" "+max_lon.toFixed(3)+" "+max_lat.toFixed(3)+")\""
    const sounds = await freeSound.textSearch('',{filter:filterString, fields:fields})
    let  msg = ''
    msg = '<h3>Geoquerying</h3>'
    msg += 'Min lat: ' + min_lat +'<br>'
    msg += 'Max lat: ' + max_lat +'<br>'
    msg += 'Min lon: ' + min_lon +'<br>'
    msg += 'Max lon: ' + max_lon +'<br>'
    msg += 'Num results: ' + sounds.count + '<br><ul>'
    for (i in sounds.results){
        msg += '<li>' +  sounds.results[i].id + ' | ' + 
            sounds.results[i].name + ' | ' + 
            sounds.results[i].url + '</li>'
    }
    msg += '</ul>'
    displayMessage(msg,'resp4')
}


// Example 5
async function example5() {
    const user = await freeSound.getUser('Jovica')    
    let  msg = ''
    msg = '<h3>User info</h3>'
    msg += 'Username: ' + user.username +'<br>'
    const sounds = await user.sounds()    
    msg += 'User sounds:<ul>'
    for (i in sounds.results){
        const item = sounds.results[i]
        const snd = await freeSound.getSound(item.id)        
        msg += '<li>' +  item.id + ' | ' + snd.name + ' | ' + snd.url + '</li>'
    }
    msg += '</ul>'
    displayMessage(msg,'resp5')
}

/* TO-DO: Implement call to displayError */
//function displayError(text){
//    document.getElementById('error').innerHTML=text
//}

function displayMessage(text,place){
    document.getElementById(place).innerHTML=text
}

/** UNCOMMENT LINES BELOW TO RUN DIFFERENT EXAMPLES: 
 * IMPORTANT!!: BE CAREFUL BECAUSE YOU CAN BUMP INTO
 * "Request was throttled because of exceeding a request limit rate (60/minute)" 
 */
//example1()
//example2()
//example3()
//example4()
//example5()

