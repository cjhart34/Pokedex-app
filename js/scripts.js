 let pokemonRepository = (function() {

 
    let pokemonList = [
            {name: 'Geodude', 
            height: 0.4, 
            type: ["Rock", "Ground"]},

            {name: 'Graveler',
             height: 1, 
             type: ["Rock", "Ground"]},

            {name: 'Golem', 
            height: 1.4, 
            type: ["Rock", "Ground"]}
        ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

let pokemonList = pokemonRepository.getAll();

pokemonList.forEach(function (pokemon) {
    if (pokemon.height >= 1) {
        document.write(`Name: ${pokemon.name} Height: ${pokemon.height} -- Wow! That\'s a big Pokemon!<br>`)
    } else if (pokemon.height > 1 && pokemon.height < 0.5) {
        document.write(`Name: ${pokemon.name} Height: ${pokemon.height} -- That\'s an average Pokemon. <br>`)
    }
    else {
        document.write(`Name: ${pokemon.name} Height: ${pokemon.height} --That\'s a small Pokemon.<br>`)
    }
})


