 let pokemonRepository = (function() {
    //IIFE
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        //  tests if the item being added is a Pokemon...is not working for me, if I comment this in, it makes it so no Pokemon load in the browser.
        // if (
        //     typeof pokemon === "object" && 
        //     "name" in pokemon &&
        //     "detailsUrl" in pokemon
        //     ) {
        pokemonList.push(pokemon);
        // } else {
        //     console.log('This is not a Pokemon');
        // }
    
    }
  // retrieves pokemon information to be output in console
    function showDetails(pokemon){
        console.log(pokemon);
    }
// returns list of pokemon and characteristics
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class'); // Having the button take on style from css
        listPokemon.appendChild(button); // calling the listpokemon to the button
        pokemonList.appendChild(listPokemon); // calling the pokemonList to the list
        // returns pokemon in console when specific pokemon is clicked on in browser
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
            });
    }
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item)
            {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
    function showDetails(pokemon) { //Function for the event listener
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    // returns pokemon names in a list as a button
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon)
    });
});
