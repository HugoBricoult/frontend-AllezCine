let moviesLoaded;
let genresLoaded;
let targetMovies;
let targetFeatured;
let targetfeatured2;
let targetfeatured3;
let targetshop;
let targetshop2;
let targetshop3;
let template;
let template6;
let showMoreFilm = true;
let swiped = 0;
let getGenre = () => {
    let promise = fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=d3b0bee1ea989a8433fdee74feae0b85&language=fr").then(rs => rs.json());
    promise.then(elem => {
        addMoviesPage1();
        genresLoaded = elem.genres;
    });
}
let addMoviesPage1 = () => {
    let promisePage1 = fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=d3b0bee1ea989a8433fdee74feae0b85&language=fr&page=1").then(rs => rs.json());
    promisePage1.then(elem => {
        moviesLoaded = elem.results;
        addMoviesPage2();
    });
}
let addMoviesPage2 = () => {
    let promisePage2 = fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=d3b0bee1ea989a8433fdee74feae0b85&language=fr&page=2").then(rs => rs.json());
    promisePage2.then(elem => {
        moviesLoaded = moviesLoaded.concat(elem.results);
        loadMovies();
    });
}
let creatElement = (element, temp) => {
    let clone = document.importNode(temp.content, true);
    //id
    let id = clone.querySelector("#movieId");
    id.setAttribute("data-id", element.id);
    //image
    let image = clone.querySelectorAll("img");
    image[0].setAttribute("src", ("https://image.tmdb.org/t/p/w500" + element.poster_path));
    //titre
    let power = clone.querySelectorAll("h4");
    power[0].textContent = element.title;
    //sortieFilm
    let sortie = clone.querySelector("#sortieMovie");
    let date = new Date(element.release_date);;
    sortie.textContent = date.getFullYear();
    //genre
    let genre = clone.querySelector("#genreMovie");
    for (let i = 0; i < genresLoaded.length; i++) {
        for (let j = 0; j < element.genre_ids.length; j++) {
            if (element.genre_ids[j] == genresLoaded[i].id) {
                genre.textContent += genresLoaded[i].name + ' ';
            }
        }
    }
    return clone;
}
let loadMovies = () => {
    let films = [];
    let films6 = [];
    moviesLoaded.forEach(element => {
        films.push(creatElement(element, template));
        films6.push(creatElement(element, template6));
    });
    //load movies (5films)
    for (let i = 0; i < 5; i++) {
        targetMovies.appendChild(films[i]);
    }
    //load featured movies 1 (6films)
    for (let i = 5; i < 11; i++) {
        targetfeatured.appendChild(films6[i]);
    }
    //load featured movies 2 (6films)
    for (let i = 11; i < 17; i++) {
        targetfeatured2.appendChild(films6[i]);
    }
    //load shop movies 1 (6films)
    for (let i = 17; i < 23; i++) {
        targetshop.appendChild(films6[i]);
    }
    //load shop movies 2 (6films)
    for (let i = 23; i < 29; i++) {
        targetshop2.appendChild(films6[i]);
    }
    for (let i = 29; i < 35; i++) {
        targetshop3.appendChild(films6[i]);
    }
    addModalEvent();
}
let addModalEvent = () => {
    let docs = document.getElementsByClassName("movies-item-5");
    for (let i = 0; i < docs.length; i++) {
        docs[i].addEventListener("click", () => {
            showModal(docs[i]);
        });
    }
    let docss = document.getElementsByClassName("movies-item-6");
    for (let i = 0; i < docss.length; i++) {
        docss[i].addEventListener("click", () => {
            showModal(docss[i]);
        });
    }
}
let showMore = () => {
    showMoreFilm = !showMoreFilm;
    if (showMoreFilm) {
        document.getElementById("featmovie2").style.display = 'none';
        document.getElementById("showMore").innerHTML = 'Voir Plus';
    } else {
        document.getElementById("featmovie2").style.display = 'flex';
        document.getElementById("showMore").innerHTML = 'Voir Moins';
    }
}
let showModal = (elem) => {
    let filmId = elem.getAttribute("data-id");
    let reqvid = "https://api.themoviedb.org/3/movie/" + filmId + "/videos?api_key=d3b0bee1ea989a8433fdee74feae0b85&language=fr";
    let promiseVideo = fetch(reqvid).then(rs => rs.json());
    promiseVideo.then(elem => {
        if (!!!elem.results[0]) {
            document.getElementById("videoYT").style.display = "none";
        } else {
            document.getElementById("videoYT").style.display = "block";
            document.getElementById("videoYT").setAttribute('src', 'https://www.youtube.com/embed/' + elem.results[0].key);
        }
        let reqInfo = "https://api.themoviedb.org/3/movie/" + filmId + "?api_key=d3b0bee1ea989a8433fdee74feae0b85&language=fr";
        let promiseInfo = fetch(reqInfo).then(rs => rs.json());
        promiseInfo.then(info => {
            document.getElementById("description").innerHTML = info.overview;
            document.getElementById("anneesorite").innerHTML = info.release_date;
            let g = "";
            for (let i = 0; i < info.genres.length; i++) {
                g += info.genres[i].name + ' ';
            }
            document.getElementById("genreFilm").innerHTML = g;
            let reqActor = "https://api.themoviedb.org/3/movie/" + filmId + "/credits?api_key=d3b0bee1ea989a8433fdee74feae0b85";
            let promiseActor = fetch(reqActor).then(rs => rs.json());
            promiseActor.then(ac => {
                let actors = ac.cast[0].name + ' | ' + ac.cast[1].name + ' | ' + ac.cast[2].name;
                document.getElementById("acteurs").innerHTML = actors;
                $('#exampleModal').modal('toggle');
            });
        });
    });
}
let filterByGenre = (genre) => {
    let tempMovie = [];
    switch (genre) {
        case 0:
            for (let i = 0; i < moviesLoaded.length; i++) {
                tempMovie.push(creatElement(moviesLoaded[i], template6));
            }
            break;
        case 1:
            for (let i = 0; i < moviesLoaded.length; i++) {
                for (let k = 0; k < moviesLoaded[i].genre_ids.length; k++) {
                    if (moviesLoaded[i].genre_ids[k] == 28) tempMovie.push(creatElement(moviesLoaded[i], template6));
                }
            }
            break;
        case 2:
            for (let i = 0; i < moviesLoaded.length; i++) {
                for (let k = 0; k < moviesLoaded[i].genre_ids.length; k++) {
                    if (moviesLoaded[i].genre_ids[k] == 18) tempMovie.push(creatElement(moviesLoaded[i], template6));
                }
            }
            break;
    }
    let ft1 = document.getElementById("featmovie");
    let child = ft1.lastElementChild;
    while (child) {
        ft1.removeChild(child);
        child = ft1.lastElementChild;
    }
    let ft2 = document.getElementById("featmovie2");
    let child2 = ft2.lastElementChild;
    while (child2) {
        ft2.removeChild(child2);
        child2 = ft2.lastElementChild;
    }
    let ft3 = document.getElementById("featmovie3");
    let child3 = ft3.lastElementChild;
    while (child3) {
        ft3.removeChild(child3);
        child3 = ft3.lastElementChild;
    }
    for (let i = 0; i < 6; i++) {
        ft1.appendChild(tempMovie[i]);
    }
    //load featured movies 1 (6films)
    for (let i = 6; i < 12; i++) {
        if (tempMovie[i] != undefined) {
            ft2.appendChild(tempMovie[i]);
        }
    }
    addModalEvent();
};
let swipe = (add) => {

    if (add) {
        swiped++;
        if (swiped == 3) swiped = 0;
        targetshop
        targetshop2
        targetshop3
    } else {
        swiped--;
        if (swiped == -1) swiped = 2;
    }
    if (swiped == 0) {
        targetshop.style.display = 'flex';
        targetshop2.style.display = 'none';
        targetshop3.style.display = 'none';
    }
    if (swiped == 1) {
        targetshop.style.display = 'none';
        targetshop2.style.display = 'flex';
        targetshop3.style.display = 'none';
    }
    if (swiped == 2) {
        targetshop.style.display = 'none';
        targetshop2.style.display = 'none';
        targetshop3.style.display = 'flex';
    }
    if (window.getSelection) { window.getSelection().removeAllRanges(); } else if (document.selection) { document.selection.empty(); }
}
let login = () => {
    $('#myModallogin').modal('toggle');
}
let register = () => {
    $('#myModalregister').modal('toggle');
}
let validation = () => {
    let firstname = document.getElementById("form_firstname").value;
    let lastname = document.getElementById("form_lastname").value;
    let email = document.getElementById("form_email").value;
    let subject = document.getElementById("form_subject").value;
    let message = document.getElementById("form_message").value;
    $('#myModal').modal('toggle');
    document.querySelector(".firstname").innerHTML = firstname;
    document.querySelector(".lastname").innerHTML = lastname;
    document.querySelector(".email").innerHTML = email;
    document.querySelector(".subject").innerHTML = subject;
    document.querySelector(".message").innerHTML = message;
}
let setancre = () => {
        let arrowDiv = document.getElementById("arrowup");
        let arrow = document.createElement("a");
        arrow.setAttribute("href", "#arrowanchor");
        let iconArrow = document.createElement('i');
        iconArrow.setAttribute('id', 'iconanchor');
        iconArrow.setAttribute('class', 'fas fa-arrow-circle-up fa-3x');
        arrow.appendChild(iconArrow);
        arrowDiv.appendChild(arrow);
    }
    (() => {
        //load elements
        targetMovies = document.getElementById("movies");
        targetfeatured = document.getElementById("featmovie");
        targetfeatured2 = document.getElementById("featmovie2");
        targetfeatured3 = document.getElementById("featmovie3");
        template = document.getElementById("templateMovie");
        template6 = document.getElementById("templateMovie6");
        targetshop = document.getElementById("shopmovie");
        targetshop2 = document.getElementById("shopmovie2");
        targetshop3 = document.getElementById("shopmovie3");
        targetshop2.style.display = 'none';
        targetshop3.style.display = 'none';
        document.getElementById("featmovie2").style.display = 'none';
        document.getElementById('sendmodallogin').addEventListener('click', login);
        document.getElementById('sendmodalregister').addEventListener('click', register);
        document.getElementById('sendmodal').addEventListener('click', validation);
        //Ajout films
        getGenre();
        //anchorArrow
        setancre();
    })();