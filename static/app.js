const form = document.querySelector('#form');
const spinner = document.getElementById('spinner');
const spinnerMessage = document.getElementById('spinnerMessage');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  spinner.classList.remove('hidden'); // Show spinner when API call starts
  spinnerMessage.classList.remove('hidden');
  getColours();

  function getColours() {
    const query = form.elements.query.value;
    fetch('/palette', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        spinner.classList.add('hidden'); // Hide the spinner when done
        spinnerMessage.classList.add('hidden');
        form.classList.add('hidden-lg-down');
        const colors = data.colors;
        const colourContainer = document.querySelector('.colourContainer');
        createColourBox(colors, colourContainer);
      });
  }
  const restartButton = document.getElementById('restart');

  restartButton.addEventListener('click', function () {
    location.reload();
  });

  function createColourBox(colors, colourContainer) {
    colourContainer.innerHTML = '';
    for (const color of colors) {
      const div = document.createElement('div');
      div.classList.add(
        'color',
        'h-full',
        'flex',
        'justify-center',
        'items-end',
        'transition-opacity',
        'duration-300',
        'hover:cursor-pointer',
        'active:opacity-80'
      );
      div.style.backgroundColor = color;

      div.addEventListener('click', function () {
        navigator.clipboard.writeText(color);
      });

      const span = document.createElement('span');
      span.innerText = color;
      span.classList.add(
        'text-white',
        'font-bold',
        'text-xl',
        'p-2',
        'text-shadow'
      );
      div.appendChild(span);
      colourContainer.appendChild(div);
    }
  }

  const copyAllButton = document.getElementById('copyAll');

  copyAllButton.addEventListener('click', function () {
    const colorElements = document.querySelectorAll('.color span');
    const colors = [];
    colorElements.forEach((el) => {
      colors.push(el.innerText);
    });

    const copyText = colors.join(', ');
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        // Clipboard write was successful
        console.log('Text copied to clipboard:', copyText);
      })
      .catch((err) => {
        // Clipboard write failed
        console.log('Clipboard write failed:', err);
      });
  });
});
