 let pokemonRepository = (function() {

    let pokemonList = [
            {name: 'Geodude', 
            height: 0.4, 
            type: ['Rock', 'Ground']},

            {name: 'Graveler',
             height: 1, 
             type: ['Rock', 'Ground']},

            {name: 'Golem', 
            height: 1.4, 
            type: ['Rock', 'Ground']}
        ];

    function add(pokemon) {
        //  tests if the item being added is a Pokemon
        if (typeof(pokemon) !== 'object'){
        console.log('This is not a Pokemon');
        } else {
            pokemonList.push(pokemon);
        }
    
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function () {
            showDetails(pokemon)
            });
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.add({name: 'Pikachu', height: 0.3, type: ['Electric'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});

