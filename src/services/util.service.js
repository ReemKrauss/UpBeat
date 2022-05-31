export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    formatISODate,
    convertMsToTime,
    proccessSpecialChars
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function formatISODate(youtube_time) {
    const array = youtube_time.match(/(\d+)(?=[MHS])/ig) || []
    const display = array.map(function (item, idx) {
        if (item.length < 2 && idx === array.length - 1) item = '0' + item
        if (array.length === 1) item = '0:' + item
        return item
    }).join(':')
    if (array.length === 3) return { total: (+array[0]) * 3600 + (+array[1]) * 60 + (+array[2]), display }
    if (array.length === 2) return { total: (+array[0]) * 60 + (+array[1]), display }
    return { total: +array[0], display }
}

function proccessSpecialChars(str){
    const specialChars = [
        {char:'&amp;', render: '&'},
        {char:'&quot;', render: '"'},
        {char:'&#39;', render: `'`},
        {char:'&lt;', render: `<`},
        {char:'&gt;', render: `>`}]
    str = str.split(' ')
    str = str.map((word) => {
        for (let i = 0; i < specialChars.length; i++){
            if(word.includes(specialChars[i].char)) word = word.replaceAll(specialChars[i].char, specialChars[i].render)
        }
        return word
    })
    return str.join(' ')

}


function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    if (minutes === 0 && hours === 0 ) return 'just now'
    if (hours === 0) return `${minutes} minutes ago`
    return `${hours} hours ago`
  }



