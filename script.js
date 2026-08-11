const root = document.documentElement;
const powerRange = document.querySelector('#powerRange');
const powerValue = document.querySelector('#powerValue');
const codeToggle = document.querySelector('#codeToggle');
const closeCode = document.querySelector('#closeCode');
const codePanel = document.querySelector('#codePanel');
const codeSample = document.querySelector('#codeSample');

const snippets = {
  default: `/* One input can drive an entire visual system */
:root {
  --power: 1;
  --mx: 50vw;
  --my: 50vh;
}

.experiment {
  transform:
    perspective(1000px)
    rotateX(calc(var(--ry) * .06 * var(--power)))
    rotateY(calc(var(--rx) * .06 * var(--power)));
}`,
  light: `.light-surface {
  background:
    radial-gradient(circle at 30% 30%, white, transparent 9%),
    radial-gradient(circle at 68% 32%, #7cffd4, transparent 23%),
    radial-gradient(circle at 54% 70%, #8f6bff, transparent 30%),
    conic-gradient(from 190deg, transparent, #ffffff2b, transparent);
  filter: blur(8px) saturate(2);
}`,
  space: `.scene { perspective: 1100px; }

.cube {
  transform-style: preserve-3d;
  animation: spinCube 18s linear infinite;
}

.front { transform: rotateY(0deg) translateZ(110px); }
.right { transform: rotateY(90deg) translateZ(110px); }
.top   { transform: rotateX(90deg) translateZ(110px); }`,
  type: `.type-line {
  font-size: clamp(76px, 17vw, 270px);
  letter-spacing: -.085em;
  transform:
    translateX(calc((var(--mx) - 50vw) * .035))
    skewX(calc(var(--rx) * .08));
}`,
  impossible: `.tilt-card {
  transform:
    perspective(900px)
    rotateX(calc(var(--ry) * .045))
    rotateY(calc(var(--rx) * .045));
  transform-style: preserve-3d;
}

.tilt-card > * {
  transform: translateZ(24px);
}`
};

function setPointerVars(x, y) {
  const nx = (x / window.innerWidth - 0.5) * 2;
  const ny = (y / window.innerHeight - 0.5) * 2;
  root.style.setProperty('--mx', `${x}px`);
  root.style.setProperty('--my', `${y}px`);
  root.style.setProperty('--rx', `${nx * 18}deg`);
  root.style.setProperty('--ry', `${-ny * 18}deg`);
}

window.addEventListener('pointermove', e => setPointerVars(e.clientX, e.clientY), { passive: true });

powerRange.addEventListener('input', () => {
  const value = Number(powerRange.value);
  powerValue.value = value;
  root.style.setProperty('--power', (value / 100).toFixed(2));
});

function currentSnippet() {
  const sections = [...document.querySelectorAll('section[id]')];
  const middle = window.innerHeight * .45;
  const current = sections.find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= middle && rect.bottom >= middle;
  });
  return snippets[current?.id] || snippets.default;
}

codeToggle.addEventListener('click', () => {
  codeSample.textContent = currentSnippet();
  codePanel.showModal();
});

closeCode.addEventListener('click', () => codePanel.close());

codePanel.addEventListener('click', e => {
  const rect = codePanel.getBoundingClientRect();
  const inside = (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  );
  if (!inside) codePanel.close();
});
