function main() {
    //TODO: add alt text comming soon to each element with soon class

    const soon = document.getElementsByClassName("soon")
    for (let i = 0; i < soon.length; i++) {
        const element = soon[i];
        element.setAttribute('title', "Comming Soon!")

    }

    console.log(navigator.userAgent, userAgentToOS())

    var list = document.getElementById("boxes");
    var recommend = document.getElementById("recommend");

    const platforms = {
        android: document.getElementById('android'),
        ios: document.getElementById('ios'),
        linux: document.getElementById('linux'),
        windows: document.getElementById('windows'),
        osx: document.getElementById('osx')
    }

    recommend.appendChild(platforms[userAgentToOS()])



    //TODO: reorder elements / recomend based on user agent
}


function userAgentToOS() {
    const uA = navigator.userAgent
    if (uA.includes('iPad') && uA.includes('Mobile'))
        return 'ios'
    else if (uA.includes('iPhone') && uA.includes('Mobile'))
        return 'ios'
    else if (uA.includes('Android'))
        return 'android'
    else if (uA.includes('Linux'))
        return 'linux'
    else if (uA.includes('Windows'))
        return 'windows'
    else if (uA.includes('Macintosh') || uA.includes('Mac OS X'))
        return 'osx'

}

window.onload = main