const searchInput = document.getElementById("search");
const btnSearch = document.querySelector(".btn-search");
const card = document.querySelector(".card");
const searchPokemon = document.querySelector(".search-pokemon");
const pokeImg = document.querySelector(".card-pokemon__img");
const pokeType = document.querySelector(".card-pokemon__type");
const pokeName = document.querySelector(".card-pokemon__name");
const pokeId = document.querySelector(".card-pokemon__id");
const pokeWeight = document.querySelector(".card-pokemon__weight");
const pokeAbilities = document.querySelector(".card-pokemon__ablitlies");
const cardHeader = document.querySelector(".card-header");

const capitalFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);
const convertKg = (kg) => kg / 10 + (kg % 10) * 2.2;

const getPokemon = async (pokemon) => {
  try {
    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!pokeRes.ok) {
      throw new Error(`Pokémon not found ): ${pokeRes.statusText}`);
    }
    const pokeData = await pokeRes.json();
    return pokeData;
  } catch (error) {
    console.log(error.message);
  }
};

const getEvo = async (pokemon) => {
  try {
    const pokeRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
    );
    const pokeData = await pokeRes.json();
    console.log(pokeData);
    return pokeData;
  } catch (error) {
    console.log(error.message);
  }
};

const getPokemonType = (pokeType) => {
  switch (pokeType) {
    case "fire":
      cardHeader.style.backgroundColor = `#EE8130`;
      card.style.backgroundColor = `#f8cdac`;
      break;

    case "water":
      cardHeader.style.backgroundColor = `#6390F0`;
      card.style.backgroundColor = `#c1d3f9`;
      break;

    case "electric":
      cardHeader.style.backgroundColor = `#F7D02C`;
      card.style.backgroundColor = `#fcecab`;
      break;

    case "grass":
      cardHeader.style.backgroundColor = `#7AC74C`;
      card.style.backgroundColor = `#cae9b7`;
      break;

    case "ice":
      cardHeader.style.backgroundColor = `#96D9D6`;
      card.style.backgroundColor = `#d5f0ef`;
      break;

    case "fighting":
      cardHeader.style.backgroundColor = `#C22E28`;
      card.style.backgroundColor = `#e7aba9`;
      break;

    case "poison":
      cardHeader.style.backgroundColor = `#A33EA1`;
      card.style.backgroundColor = `#dab2d9`;
      break;

    case "ground":
      cardHeader.style.backgroundColor = `#E2BF65`;
      card.style.backgroundColor = `#f3e5c1`;
      break;

    case "flying":
      cardHeader.style.backgroundColor = `#A98FF3`;
      card.style.backgroundColor = `#ddd2fa`;
      break;

    case "psychic":
      cardHeader.style.backgroundColor = `#F95587`;
      card.style.backgroundColor = `#fdbbcf`;
      break;

    case "bug":
      cardHeader.style.backgroundColor = `#A6B91A`;
      card.style.backgroundColor = `#dbe3a3`;
      break;

    case "rock":
      cardHeader.style.backgroundColor = `#B6A136`;
      card.style.backgroundColor = `#e2d9af`;
      break;

    case "ghost":
      cardHeader.style.backgroundColor = `#735797`;
      card.style.backgroundColor = `#c7bcd5`;
      break;

    case "dragon":
      cardHeader.style.backgroundColor = `#6F35FC`;
      card.style.backgroundColor = `#c5aefe`;
      break;

    case "dark":
      cardHeader.style.backgroundColor = `#705746`;
      card.style.backgroundColor = `#c6bcb5`;
      break;

    case "steel":
      cardHeader.style.backgroundColor = `#B7B7CE`;
      card.style.backgroundColor = `#e2e2eb`;
      break;

    case "fairy":
      cardHeader.style.backgroundColor = `#D685AD`;
      card.style.backgroundColor = `#efcede`;
      break;

    default:
      cardHeader.style.backgroundColor = `#A8A77A`;
      card.style.backgroundColor = `#dcdcca`;
  }
};

const renderPokemon = async (pokemonName) => {
  try {
    const pokeData = await getPokemon(pokemonName);
    if (!pokeData) {
      throw new Error(`Pokémon not found: ${pokemonName}`);
    }
    const {
      abilities: [
        {
          ability: { name: abilityName },
        },
      ],
      sprites: { front_default },
      types,
    } = pokeData;
    const [
      { type: { name: type1 } = {} },
      { type: { name: type2 } = {} } = {},
    ] = types;
    if ((type1, type2)) {
      pokeType.textContent = `Types: ${capitalFirstLetter(
        type1
      )} / ${capitalFirstLetter(type2)}`;
    } else pokeType.textContent = `Type: ${capitalFirstLetter(type1)}`;

    getPokemonType(type1);

    pokeName.textContent = capitalFirstLetter(pokemonName);
    pokeId.textContent = `#${pokeData.id}`;
    pokeWeight.textContent = `Weight: ${+convertKg(pokeData.weight).toFixed(
      1
    )} kgs`;
    pokeAbilities.textContent = `Abilities: ${capitalFirstLetter(abilityName)}`;
    pokeImg.setAttribute("src", front_default);
    pokeImg.setAttribute("alt", pokemonName);

    getEvo(pokemonName);
    console.log(pokeData);

    card.style.opacity = 1;
  } catch (error) {
    searchPokemon.textContent = `Pokémon not found ❌`;
    console.log(error.message);
  }
};

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  searchPokemon.textContent = "Search Pokémon";
  const pokemonName = searchInput.value;
  renderPokemon(pokemonName.toLowerCase());

  searchInput.value = "";
});
