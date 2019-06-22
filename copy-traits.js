import traits from './traits';
import specs from './specializations';
import icon from './icon.svg';

function addCopyTraitsButtons() {
  const specEmbeds = document.querySelectorAll('.gw2a-specializations-embed');
  for (const specEmbed of specEmbeds) {
    addButton(specEmbed);
  }
}

function parseCSI(text, len) {
  if (!text) {
    return;
  }
  const ints = text.split(',').map(a => parseInt(a));
  if (ints.length !== len) {
    return;
  }
  for (const i of ints) {
    if (isNaN(i)) {
      return;
    }
  }
  return ints;
}

function addButton(specEmbed) {
  const embed = specEmbed.parentNode;

  const templateSpecs = parseCSI(embed.dataset.armoryIds, 3)
  if (!templateSpecs) {
    return;
  }

  const templateTraits = {};
  for (const templateSpec of templateSpecs) {
    const tts = parseCSI(embed.dataset[`armory-${templateSpec}Traits`], 3);
    if (!tts) {
      return;
    }
    templateTraits[templateSpec] = tts;
  }

  let output = '';
  for (let tspec of templateSpecs) {
    output += specs[tspec] + ' ';
    let outputTraits = [];
    for (let tt of templateTraits[tspec]) {
      outputTraits.push(traits[tt] + 1);
    }
    output += outputTraits.join('-') + ' ';
  }

  const elt = document.createElement('div');
  elt.style.position = 'absolute';
  elt.style.top = 0;
  elt.style.left = 0;
  elt.style.overflow = 'hidden';
  elt.style.width = '28px';
  elt.style.height = '28px';
  elt.style.paddingLeft = '28px';
  elt.style.paddingRight = 0;
  elt.style.lineHeight = '28px';
  elt.style.zIndex = 20;
  elt.style.background = 'rgba(0, 0, 0, 0.8)';
  elt.textContent = output;
  const eltText = elt.childNodes[0];

  const imageContainer = document.createElement('img');
  imageContainer.style.position = 'absolute';
  imageContainer.style.top = '4px';
  imageContainer.style.left = '4px';
  imageContainer.style.height = '20px';
  imageContainer.style.cursor = 'pointer';
  imageContainer.src = `data:image/svg+xml;base64,${btoa(icon)}`;
  imageContainer.alt = 'Copy Traits';

  elt.insertBefore(imageContainer, eltText);

  elt.addEventListener('mouseenter', function() {
    elt.style.width = 'auto';
    elt.style.paddingRight = '4px';
  });
  elt.addEventListener('mouseleave', function() {
    elt.style.width = '28px';
    elt.style.paddingRight = 0;
  });
  elt.addEventListener('click', function() {
    navigator.clipboard.writeText(output).then(() => {
      eltText.textContent = 'Copied Traits';
      setTimeout(() => {
        eltText.textContent = output;
      }, 1500);
    });
  });

  const firstSection = embed.querySelector('.gw2a--10x8O');
  firstSection.style.position = 'relative';
  firstSection.appendChild(elt);
}

if (document.body) {
  addCopyTraitsButtons();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    addCopyTraitsButtons();
  });
}
