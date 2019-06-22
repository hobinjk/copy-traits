const fetch = require('node-fetch');
const fs = require('fs');

async function getTraits() {
  let res = await fetch('https://api.guildwars2.com/v2/traits');
  const traitIds = await res.json();
  const traits = {};
  for (let traitId of traitIds) {
    console.log(traits.length, traitIds.length);
    res = await fetch(`https://api.guildwars2.com/v2/traits/${traitId}`);
    const trait = await res.json();
    traits[trait.id] = trait.order;
  }
  fs.writeFileSync('traits.json', JSON.stringify(traits));
  console.log(JSON.stringify(traits));
}

async function getSpecializations() {
  let res = await fetch('https://api.guildwars2.com/v2/specializations');
  const specIds = await res.json();
  const specs = {};
  for (let specId of specIds) {
    console.log(specs.length, specIds.length);
    res = await fetch(`https://api.guildwars2.com/v2/specializations/${specId}`);
    const spec = await res.json();
    specs[spec.id] = spec.name;
  }
  fs.writeFileSync('specializations.json', JSON.stringify(specs));
  console.log(JSON.stringify(specs));
}

getTraits();
getSpecializations();
