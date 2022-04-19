function main() {
    $(document).ready(function () {
        drawTiers(0);

        $('#seed').on('change', function () {
            drawTiers($(this).val());
        })
    });
}

function drawTiers(seed) {
    var tiers = getPokemon(seed);

    $('.tiers').html('');

    for (var tier = 0; tier < tiers.length; tier++) {
        var column = $('<div></div>').addClass('col-12 col-md-6 col-lg-4');
        $(column).append($('<p></p>').text(tiers[tier].tier));

        for (var pokemon = 0; pokemon < tiers[tier].pokemon.length; pokemon++) {
            $(column).append($('<p></p>').text((pokemon + 1) + ": " + tiers[tier].pokemon[pokemon]));
        }

        $('.tiers').append(column);
    }
}

function getPokemon(seed) {
    var random = new Math.seedrandom(seed);

    var output = [];
    for (var tier = 0; tier < tiers.length; tier++) {
        var name = tiers[tier].name;

        var pokemonWeights = [];
        for (var pokemon = 0; pokemon < tiers[tier].pokemon.length; pokemon++) {
            pokemonWeights.push({ pokemon: tiers[tier].pokemon[pokemon], weight: random() });
        }

        pokemonWeights = pokemonWeights.sort(function(a, b) {
            return a.weight - b.weight;
        })

        var outputPokemon = [];
        for (var pokemon = 0; pokemon < pokemonWeights.length; pokemon++) {
            outputPokemon.push(pokemonWeights[pokemon].pokemon);
        }

        output.push({ tier: name, pokemon: outputPokemon });
    }

    return output;
}

main();