function toggleDataOpen(el) {
  el.getAttribute('data-open') === ''
    ? el.removeAttribute('data-open')
    : el.setAttribute('data-open', '');
}

window.toggleDataOpen = toggleDataOpen;
