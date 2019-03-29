function query (selector) {
    return document.querySelector(selector)
}

function queryAll (selector) {
    return document.querySelector(selector)
}

document.addEventListener('DOMContentLoaded', function () {
    const promise = fetch(
        `https://itunes-api-proxy.glitch.me/search?term=jack+johnson`).then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.json()
        })
        return promise
})