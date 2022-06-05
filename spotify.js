const getAuth = async () => {
    const clientID = '3b23938dc142414e83a5fcca49144eb9';
    const clientSecret = '725b4c644ee049e6b841a610351b99ae';
    const encodedString = btoa(clientID +':'+clientSecret);
    const response = await fetch('https://accounts.spotify.com/api/token',
    {
        method: "POST",
        headers:{
            'Authorization': `Basic ${encodedString}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:'grant_type=client_credentials'
    }
    );
    let token = await response.json();
    return token.access_token
}

const loadToken = async () =>{
    const token = await getAuth();
    return token
}
let playing = false;
const getAlbum = async (album,artist) => {
    const token = await loadToken();
    let data = await fetch(`https://api.spotify.com/v1/search?type=track&q=album:${album}+artist:${artist}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

        }
    });
    data= await data.json();  
    length = data.tracks.total
    //get a random song to play
    random_track_num = Math.floor(Math.random()*length)
    console.log(data,random_track_num)
    
    if(playing === true){
        flipBool()
        pauseSong()
    }
    else{
        playSong(data,random_track_num)
    }
    return data

}
const flipBool = () =>{
    if (playing ===false){
        playing = true
        var x = document.getElementById('pbtn')
        x.style.display = 'block'
    }else{
        playing = false
    }
}
    //use that preview url to create a new HTML audio object
const playSong =(data,random_track_num) => {
    url = data.tracks.items[random_track_num].preview_url
    flipBool()
    song = new Audio(url)
    return song.play();
    
    }
    
const pauseSong = () =>{
    return song.pause()
}

const pickAlbum = async (id,event) =>{
    event.stopPropagation();
    let a0=['North Hills','Dawes']
    let a1=['White Lighter','Typhoon']
    let a2=['So Long, See You Tomorrow','Bombay Bicycle Club']
    let a3=['Absolute Loser','Fruit Bats']
    let a4=['The New Abnormal','The Strokes']
    let a5=['The Mollusk','Ween']
    let a6=['Cardinal (Expanded Edition)','Pinegrove']
    let a7=['Subliming','Richy Mitch & The Coal Miners']
    let a8=['Father of the Bride','Vampire Weekend']


let albums = [a0,a1,a2,a3,a4,a5,a6,a7,a8]
    getAlbum(albums[id][0],albums[id][1])
}

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

