const colorsDiv = document.getElementById('colors');
const addColorBtn = document.getElementById('add-color');
let colorCount = 2;

addColorBtn.addEventListener('click', function() {
  colorCount++;
  const newColorDiv = document.createElement('div');
  const newColorLabel = document.createElement('label');
  newColorLabel.setAttribute('for', `color-${colorCount}`);
  newColorLabel.textContent = `Color ${colorCount}: `;

  const newColorInput = document.createElement('input');
  newColorInput.setAttribute('type', 'color');
  newColorInput.setAttribute('id', `color-${colorCount}`);
  newColorInput.setAttribute('name', `color-${colorCount}`);
  newColorInput.setAttribute('value', '#00fd00');

  const removeColorBtn = document.createElement('button'); // create remove button
  removeColorBtn.textContent = 'Remove'; // set button text
  removeColorBtn.addEventListener('click', function() { // add event listener to remove color element
    if (colorCount > 2) {
      colorCount--;
      colorsDiv.removeChild(newColorDiv);
    }
  });

  newColorDiv.appendChild(newColorLabel);
  newColorDiv.appendChild(newColorInput);
  newColorDiv.appendChild(removeColorBtn); // add remove button to color element
  colorsDiv.appendChild(newColorDiv);
});
