rofl = false




currentSong = 0
function setSong(autoplay = false){
    seconds = (songs[currentSong].length%60).toString()
    if (seconds.length < 2){
        seconds = "0"+seconds
    }
    document.querySelector(".total-time").innerHTML = `${Math.floor(songs[currentSong].length/60)}:${seconds}`
    soundPlayer = new Audio(songs[currentSong].file)
    document.querySelector(".now-time").innerHTML = `0:00`
    document.querySelector("body").style = `background-color:${songs[currentSong].color};`
    document.querySelector(".songname").innerHTML = songs[currentSong].name
    document.querySelector(".author").innerHTML = songs[currentSong].author
    if (autoplay){
        while (soundPlayer.paused){
            soundPlayer.play()
        }
    }
    update(soundPlayer.currentTime)
}


function update(time){
    minutes = Math.floor(time/60)
    seconds = Math.floor(time%60).toString()
    
    if (seconds.length < 2){
        seconds = "0"+seconds
    }
    if (soundPlayer.paused){
        document.querySelector(".pause").classList.add("paused")
    }else{
        document.querySelector(".pause").classList.remove("paused")

    }
    document.querySelector(".now-time").innerHTML = `${minutes}:${seconds}`
    document.querySelector(".progress").style.width = `${time/songs[currentSong].length*100}%`
    document.querySelector(".circle").style.left = `${time/songs[currentSong].length*100}%`
    checkEnded()
}



function checkEnded(){
    if (songs[currentSong].length-soundPlayer.currentTime<=0){
        nextSong(true)
    }
}
function nextSong(autoplay = false){
    if (can_switch){
        can_switch = false

        
        if (currentSong == songs.length-1){
            currentSong = 0;
        } 
        else{
            currentSong += 1
        }
        document.querySelector(".album-covers").innerHTML += `
            <img src="${songs[currentSong].cover}" alt="" class="cover2" style="transform:translateX(100%);transition:.3s;">
        `

        setTimeout(() => {
            document.querySelector(".album-covers img").style = "transform:translate(calc(-100% - 40px),0);"
            document.querySelector(".album-covers img.cover2").style = "transform:translate(0,0);"
        }, 1);
        setTimeout(() => {
            document.querySelector(".album-covers img.cover2").style = "transition:0;"
            document.querySelector(".album-covers img.cover2").classList.remove("cover2")
            document.querySelector(".album-covers img").classList.add("toremove")
            document.querySelector(".album-covers img.toremove").remove()


            can_switch = true
        }, 300);

        if (!soundPlayer.paused || autoplay){
            soundPlayer.pause()
            setTimeout(() => {
                setSong(true)
            }, 150);

        }else{
            setSong()
        }
        soundPlayer.pause()
    }
}
function previousSong(autoplay = false){
    if (can_switch){
        can_switch = false

        if (currentSong == 0){
            currentSong = songs.length-1;
        } 
        else{
            currentSong -= 1
        }

        document.querySelector(".album-covers").innerHTML = `
            <img src="${songs[currentSong].cover}" alt="" class="cover2" style="transform:translateX(-100%); transition:.3s;">
        `+document.querySelector(".album-covers").innerHTML

        setTimeout(() => {
            document.querySelectorAll(".album-covers img")[1].style = "transform:translate(calc(100% + 40px),0);"
            document.querySelector(".album-covers img.cover2").style = "transform:translate(0,0);"
        }, 1);
        setTimeout(() => {
            document.querySelector(".album-covers img.cover2").style = "transition:0;"
            document.querySelector(".album-covers img.cover2").classList.remove("cover2")
            document.querySelectorAll(".album-covers img")[1].classList.add("toremove")
            document.querySelector(".album-covers img.toremove").remove()


            can_switch = true
        }, 300);






        if (!soundPlayer.paused || autoplay){
            soundPlayer.pause()
            setTimeout(() => {
                setSong(true)
            }, 150);
        }else{
            setSong()
        }
        soundPlayer.pause()
    }
    
}

function template(bool=true){
    seconds = (songs[currentSong].length%60).toString()
    if (seconds.length < 2){
        seconds = "0"+seconds
    }
    total_time = `${Math.floor(songs[currentSong].length/60)}:${seconds}`


    minutes = Math.floor(time/60)
    seconds = Math.floor(time%60).toString()
    if (seconds.length < 2){
        seconds = "0"+seconds
    }
    if (soundPlayer.paused){
        document.querySelector(".pause").classList.add("paused")
    }else{
        document.querySelector(".pause").classList.remove("paused")

    }
    return `
            <div class="controls c2" style="transform:translateX(${!bool?-1*120:120}%);">
                <div class="songname">${songs[currentSong].name}</div>
                <div class="author">${songs[currentSong].author}</div>
                <div class="timeline">
                    <div class="line">
                        <div class="progress" style="width:${time/songs[currentSong].length*100}%"></div>
                        <div class="circle" style="left:${time/songs[currentSong].length*100}%"></div>
                    </div>
                    <div class="now-time">
                        ${minutes}:${seconds}
                    </div>
                    <div class="total-time">
                        ${total_time}
                    </div>
                </div>

                <div class="control-buttons">
                    <div class="like button">
    
                    </div>
                    <div class="song-controls">
                        <div class="previous button"></div>
                        <div class="pause button ${document.querySelector(".pause").classList.contains("paused")?"paused":""}"></div>
                        <div class="next button"></div>
                    </div>
                    <div class="dislike button">
    
                    </div>
                </div>
            </div>
    `
}

function nextControls(){    
    document.querySelector(".bottom").innerHTML += template()
    setTimeout(() => {
        document.querySelector(".controls").style = "transition:.3s; transform:translate(-120%,0);"
        document.querySelector(".controls.c2").style = "transition:.3s; transform:translate(0,0);"
    }, 1);
    setTimeout(() => {
        document.querySelector(".controls").style = "transition:0;"
        document.querySelector(".c2").remove()
        setButtons()
    }, 300);
}

function previousControls(){    
    document.querySelector(".bottom").innerHTML = template(false) + document.querySelector(".bottom").innerHTML
    
    setTimeout(() => {
        document.querySelectorAll(".controls")[1].style = "transition:.3s; transform:translate(120%,0);"
        document.querySelector(".controls.c2").style = "transition:.3s; transform:translate(0,0);"
    }, 1);
    setTimeout(() => {
        document.querySelectorAll(".controls")[1].style = "transition:0;"
        document.querySelector(".c2").remove()
        setButtons()
    }, 300);
}

can_switch = true

setInterval(() => {
    update(soundPlayer.currentTime)
}, 16);



setSong()


let time = 0


function setButtons(){
    document.querySelector(".album-covers").innerHTML = `<img src="${songs[currentSong].cover}" alt="">`
    document.querySelector(".next").onclick = ()=>{
        if (!rofl){
            nextSong()
        }
        else{
            time = soundPlayer.currentTime
            nextControls()
        }
    }
    document.querySelector(".previous").onclick = ()=>{
        if (!rofl){
            time = soundPlayer.currentTime
            previousSong()
        }
        else{
            previousControls()
        }
    }
    
    timeline = document.querySelector(".timeline")
    timeline.addEventListener("click",(event)=>{
        time = Math.floor(event.offsetX/timeline.offsetWidth*songs[currentSong].length)
        soundPlayer.currentTime = time
        update(soundPlayer.currentTime)
    
        
    })
    pauseButton = document.querySelector(".pause")
    pauseButton.onclick = ()=>{
        if (soundPlayer.paused){
            soundPlayer.play()
        }else{
            soundPlayer.pause() 
        }
        pauseButton.classList.toggle("paused")
    }
}


document.querySelector(".rofl").onclick = ()=>{
    if (document.querySelector("#rofl").checked){
        rofl = true
    }else{
        rofl = false
    }
    setButtons()
}


document.querySelector("body").addEventListener("keypress",(event)=>{
    if (event.key == " " || event.key == "k"){
        if (soundPlayer.paused){
            soundPlayer.play()
        }else{
            soundPlayer.pause() 
        }
        update(soundPlayer.currentTime)
    }
    else if (event.key == "l"){
        nextSong()
    }
    else if (event.key == "j"){
        previousSong()
    }
})

setButtons()