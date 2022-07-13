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
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                // console.log(pokemon);
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
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);
        });
    }
    let modalContainer = document.querySelector('#modal-container');
  

    function showModal(pokemon) {
        modalContainer.innerHTML = ' ';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('pointer-action', 'none');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        // closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerHTML = "Height: "+pokemon.height+"<br>";

        let imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-image');
        imageElement.src = pokemon.imageUrl;

        let types = [];
        pokemon.types.forEach(function(typeObj){
          types.push(" "+typeObj.type.name);
        });
        
        if (types.length<2) {
          contentElement.innerHTML += "Type:";
        } else {
          contentElement.innerHTML += "Types:";
        }
        contentElement.innerHTML += types.toString();
   
        modal.appendChild(imageElement);
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
       
       
    };

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    };

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if(target === modalContainer) {
            hideModal();
        }
    });

    // document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal('Modal title', 'This is the modal content');
    // });

    window.addEventListener('keydown', (e) => {
        // let modalContainer = document.querySelector('modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();



console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    // returns pokemon names in a list as a button
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon)
    });
});


