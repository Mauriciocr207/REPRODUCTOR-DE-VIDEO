// VARIABLES
// Logo
    const logoContainer = document.querySelector('#logoContainer');
    const logo = document.querySelector('#logo');
// Video controls
    const video = document.querySelector('#video');
    const containerVideo = document.querySelector('.video');
    const play = document.querySelector('#play');
    const nextVideoButton = document.querySelector('#next');
    const reloadVideo = document.querySelector('#reload');
    const volume = document.querySelector('#volume');
    const volume__range = document.querySelector('#volume__range');
    const resize = document.querySelector('#resize');
    const load = document.querySelector('#barraLoad');
    const barra = document.querySelector('#beforeRange');
// Tema
    const changeThemeButton = document.querySelector('#btn-switch');
// TrackList
    const trackListButton__input = document.querySelector('#navbar-button');
    const trackListButton__visible = document.querySelector('.navbar-button');
    let Track, nameSong = '';
    const twiceTracks = [
        {name: 'Fancy', url: 'resources/twice/fancy.mp4'},
        {name: 'The Feels', url: 'resources/twice/the feels.mp4'},
        {name: 'Alcohol Free', url: 'resources/twice/alcohol free.mp4'},
        {name: 'I can´t stop me', url: 'resources/twice/i cant stop me.mp4'},
        {name: 'Feel Special', url: 'resources/twice/feel special.mp4'},
        {name: 'Your existence', url: 'resources/twentyfivetwentyone/your existence.mp4'}
    ]
    const btsTracks = [
        {name: 'Where You From', url: 'resources/bts/Where You From.mp4'},
        {name: 'Yet To Come', url: 'resources/bts/Yet To Come.mp4'},
        {name: 'Dynamite', url: 'resources/bts/Dynamite.mp4'},
        {name: 'Butter', url: 'resources/bts/Butter.mp4'},
        {name: 'Boy With Luv', url: 'resources/bts/Boy With Luv.mp4'},
        {name: 'Run', url: 'resources/bts/Run.mp4'},
        {name: 'Yours', url: 'resources/bts/Yours.mp4'},
        {name: 'Abyss', url: 'resources/bts/Abyss.mp4'},
        {name: 'Your existence', url: 'resources/twentyfivetwentyone/your existence.mp4'}
    ]
// Preloader
    const preloader = document.querySelector('#preloader');
// Containers --> servirá para realizar la función de disappearControls
    const header = document.querySelector('#header');
    const aside  = document.querySelector('#aside');
    const cargaContainer = document.querySelector('#cargaContainer');
    const ButtonsContainer = document.querySelector('#ButtonsContainer');



// Video Controls --> Funciones
function playStop() {
    if(video.paused) {
        video.play();
        changeClassList('#play', 'fa-play','fa-pause');
    } else {
        video.pause();
        changeClassList('#play','fa-pause','fa-play');
    }
};
function reSize() {
    const body = document.querySelector('body');
    if(document.fullscreenElement) {
        document.exitFullscreen();
        changeClassList('#resize', 'fa-solild fa-compress','fa-solid fa-expand');
    } else {
        body.requestFullscreen();
        changeClassList('#resize', 'fa-solid fa-expand', 'fa-solid fa-compress');
    }    
};
function volumeFunction() {
    video.volume = volume__range.value/100;
};
function nextVideo() {
    let numSong;
    for (const i in Track) {
        if(Track[i].name == nameSong) {
            numSong = i;
        } 
    }
    numSong++;
    if(numSong == Object.keys(Track).length) {
        numSong = 0;       
    }
    video.src = Track[numSong].url;
    nameSong = Track[numSong].name;
    playStop();
};
function reViewVideo() {
    video.currentTime = 0;
};
function changeClassList(id, clasesOld, clasesNew) {
    const obj = document.querySelector(id);
    const arrClasesOld = clasesOld.split(' ');
    // Eliminar clases
    for (const i of arrClasesOld) {
        obj.classList.remove(i);
    }
    // Añadir nuevas clases
    const arrClasesNew = clasesNew.split(' ');
    for (const i of arrClasesNew) {
        obj.classList.add(i);
    }
};
function videoTime() {
    const videoTimeDuration = video.duration;
    const videoActualTime = video.currentTime;
    const percentage = (videoActualTime / videoTimeDuration * 100);
    let num = +(Math.round(percentage + "e+2")  + "e-2");
    if(isNaN(num)) {
        load.value = 0;
    } else {
        load.value = num;
    }

    barra.style.transform = `translateX(-${100 - load.value}%)`;
    
    if(num == 100) {
        nextVideo();
    }
}
function changeVideoTime() {
    const percentage = parseInt(this.value);
    video.currentTime = video.duration * percentage / 100;
}
play.addEventListener('click', playStop);
nextVideoButton.addEventListener('click', nextVideo);
reloadVideo.addEventListener('click', reViewVideo);
volume__range.addEventListener('input', function() {
    volumeFunction();
    changeClassList('#volume','fa-volume-xmark', 'fa-volume-high');
})
volume.addEventListener('click', function() {
    if(video.volume != 0) {
        video.volume = 0;
        changeClassList('#volume', 'fa-volume-high', 'fa-volume-xmark');
    } else {
        volumeFunction();
        changeClassList('#volume','fa-volume-xmark', 'fa-volume-high');
    }
})
resize.addEventListener('click', reSize);
load.addEventListener('input', changeVideoTime);



// Tema --> Funciones
function generateTrack() {
    const ul = document.querySelector('#lista-container');
    if(ul.hasChildNodes()) {
        let hijos = document.querySelectorAll('.song');
        for (const i of hijos) {
            i.remove();
        }
    }
    if(this.checked) {
        Track = btsTracks;
        video.src = '';
        let color1 = 'var(--BTS-primary)';
        let color2 = 'var(--BTS-secondary)';
        containerVideo.style.backgroundColor = color1;
        trackListButton__visible.style.color = color2;
        play.style.color = color2;
        nextVideoButton.style.color = color2;
        reloadVideo.style.color = color2;
        volume.style.color = color2;
        resize.style.color = color2;
        barra.style.backgroundColor = '#515151';
        document.querySelector('.lista').style.color = color2;
    } else {
        Track = twiceTracks;
        video.src = '';
        let color2 = 'var(--Tw-primary)';
        let color1 = 'var(--Tw-secondary)';
        containerVideo.style.backgroundColor = color1;
        trackListButton__visible.style.color = color2;
        play.style.color = color2;
        nextVideoButton.style.color = color2;
        reloadVideo.style.color = color2;
        volume.style.color = color2;
        resize.style.color = color2;
        barra.style.backgroundColor = color2;
        document.querySelector('.lista').style.color = color2;
    }
    Track.forEach(function(element) {
        let li = document.createElement('Li');
        li.textContent = element.name;
        li.classList.add('song');
        ul.appendChild(li);
    });
    
    document.querySelectorAll('.song').forEach(element => {
        element.addEventListener('click', function() {
            logo.src = '';
            for (const i of Track) {
                if(element.textContent == i.name) {
                    video.src = i.url;
                    nameSong = i.name;
                    playStop();
                };
            }
        })
    });
}
function changeLogo() {
    logoContainer.style.display = 'flex';
    logoContainer.style.opacity = '0';
    logoContainer.style.transition = 'none';
    if(this.checked) {
        
        logo.src = 'resources/img/Logo-BTS.png'
        
    } else {
        logo.src = 'resources/img/Logo-Tw.png'
    }
    setTimeout(() => {
        logoContainer.style.transition = 'all .3s';
        logoContainer.style.opacity = '1';    
    }, 600);
}
changeThemeButton.addEventListener('click', generateTrack);
changeThemeButton.addEventListener('click', changeLogo);


// TrackList --> Funciones
function showTrack() {
    if(this.checked) {
        aside.style.borderRadius = '0px';
        setTimeout(() => {
            aside.style.height = '100vh';
            aside.style.transform = 'translateX(0%)';
            trackListButton__visible.style.transform = "rotate(360deg)";
        }, 200);
    } else {
        aside.style.height = '41px';
        aside.style.transform = 'translateX(calc(-100% + 39px))';   
        setTimeout(() => {
            trackListButton__visible.style.transform = "rotate(90deg)";
            aside.style.borderRadius = '100px';
        }, 300);
    }
}
trackListButton__input.addEventListener('click', showTrack);


// Video --> Funciones
function preLoadVideo() {
    console.log('carga de datos realizada');
};

// Funciones para desaparecer controles de video
// APPEAR-DISAPPEAR CONTROLS
function appearControls() {
    header.style.opacity = '1';
    aside.style.opacity = '1';
    cargaContainer.style.opacity = '1';
    ButtonsContainer.style.opacity = '1';
};
function disappearControls() {
    header.style.opacity = '0';
    aside.style.opacity = '0';
    cargaContainer.style.opacity = '0';
    ButtonsContainer.style.opacity = '0';
};
(function () {
    let set; 
    const timeAwait = 6000;
    let moving = false;
    let setTimeoutEjecuted = false;
    document.onmousemove = function() {
        moving = true;
        setTimeoutEjecuted = false;
    }
    setInterval(() => {
        if(moving === true || video.paused) {
            moving = false;
            // Estilos al movimiento
            // console.log('moviendo');
            appearControls();
            clearTimeout(set);
        }
        else {
            if(!setTimeoutEjecuted) {
                // console.log('NO moviendo');
                setTimeoutEjecuted = true;    
                set = setTimeout(() => {
                    // Estilos al parar
                    if(!trackListButton__input.checked) {
                        disappearControls();
                    }
                }, timeAwait);
            }
        }
    }, 100);
})();

video.ontimeupdate = videoTime;
video.onloadeddata = videoTime;



// Funciones del objeto window
window.onload = generateTrack;

