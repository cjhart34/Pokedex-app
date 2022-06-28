let pokemonList = [
    {name: 'Geodude', height: 0.4, type: ["Rock", "Ground"]},
    {name: 'Graveler', height: 1, type: ["Rock", "Ground"]},
    {name: 'Golem', height: 1.4, type: ["Rock", "Ground"]}
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1) { // Highlighting big Pokemon 
      document.write('<p class="special">' + pokemonList[i].name, '(height: ' + pokemonList[i].height + ')-Wow! That\'s a big Pokemon!</p>')
    } else {
      document.write('<p>' + pokemonList[i].name, '(height: ' + pokemonList[i].height + ')</p>')
    }
  }