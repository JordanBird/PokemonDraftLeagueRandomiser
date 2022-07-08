var savedTiers;

function main() {
    $(document).ready(function () {
        $.getJSON("content/tiers.json")
        .done(function(data) {
            savedTiers = data;

            drawTiers(0);
            initDynamicEvents();

            initEvents();
        })
    });
}

function drawTiers(seed) {
    var tiers = getPokemon(seed);

    $('.tiers').html('');

    for (var tier = 0; tier < tiers.length; tier++) {
        var column = $('<div></div>').addClass('col-12 col-md-6 col-lg-3');
        $(column).append($('<strong></strong>').text(tiers[tier].tier));

        for (var pokemon = 0; pokemon < tiers[tier].pokemon.length; pokemon++) {
            $(column).append($('<p></p>').text((pokemon + 1) + ": " + tiers[tier].pokemon[pokemon]).addClass('pokemon-text'));
        }

        $('.tiers').append(column);
    }
}

function getPokemon(seed) {
    var random = new Math.seedrandom(seed);

    var output = [];
    for (var tier = 0; tier < savedTiers.length; tier++) {
        var name = savedTiers[tier].name;

        var pokemonWeights = [];
        for (var pokemon = 0; pokemon < savedTiers[tier].pokemon.length; pokemon++) {
            pokemonWeights.push({ pokemon: savedTiers[tier].pokemon[pokemon], weight: random() });
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

function initEvents() {
    $('#seed').on('keyup keypress blur change', function () {
        drawTiers($(this).val());

        initDynamicEvents();
    });
}

function initDynamicEvents() {
    $('.pokemon-text').on('click', function () {
        navigator.clipboard.writeText($(this).html().split(': ')[1]);
        $('.toast-body').html($(this).html().split(': ')[1] + " added to clipboard.");
        $('.toast').show({autohide: true});
    });
}

main();