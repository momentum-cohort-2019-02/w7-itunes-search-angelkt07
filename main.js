/* globals fetch */

function query (selector) {
    return document.querySelector(selector)
}

function queryAll (selector) {
    return document.querySelector(selector)
}

function searchMusic (searchInput) {
    updateMusic(searchInput)
}

function getMusic (searchInput) {
    const promise = fetch(
    `https://itunes-api-proxy.glitch.me/search?term=${encodeURIComponent(searchInput)}&limit=100&entity=song`).then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })
    return promise
}

function updateMusic (artistName) {
    getMusic(artistName)
    .then(function (musicData) {
        // creates the data for the music
        console.log(musicData)

        //names the div for the music
        const musicDiv = query('#music')

        //names the div for the artist span
        const artist = musicData.results[0].artistName

        //updates the span where the artist name goes
        query('#artist').innerText = artist

        //starts off as an empty string
        musicDiv.innerHTML = ''

        // declares the index variable for the for loop
        let index

        // goes through all music
        for (index = 0; index < musicData.results.length; index++) {
            // creates the musicGroup box as I had in html
            const musicGroup = document.createElement('div')
            const musicBox = document.createElement('div')
            const titleName = document.createElement('div')
            

            // declares variable name for audio 
            const musicUrl = musicData.results[index].previewUrl

            // declares variable name for artwork
            const musicArt = musicData.results[index].artworkUrl100
            // updates the art work
            musicBox.innerHTML = `<img src="${musicArt}">`

            // declares the title
            const title = musicData.results[index].trackName
            //updates the title with trackname
            titleName.innerText = title
            
            musicDiv.appendChild(musicGroup)
            musicGroup.appendChild(musicBox)
            // musicBox.appendChild(musicGroup)
            musicGroup.appendChild(titleName)

            musicBox.classList.add('musicart')
            musicBox.classList.add(`track-${index}`)
            titleName.classList.add('title')
            musicGroup.classList.add('musicGroup')
        }
    })
}

// function playSong(index, musicUrl, title) {

//     const audio = query('#nowplaying')
//     audio.innerHTML = `
//     <p class="now">Now playing</p>
//     <audio class="play-bar" id="play-bar" controls src=""></audio>`
// }


document.addEventListener('DOMContentLoaded', function () {
    //do something
    query('#submitForm').addEventListener('submit', function(event) {
        const artistName = query('#searchInput')
        event.preventDefault()
        searchMusic(artistName.value)
        artistName.value = ''
    })
})


  

