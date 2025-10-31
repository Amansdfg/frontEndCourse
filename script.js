const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => menu.classList.toggle('open'));

const links = Array.from(menu.querySelectorAll('a'));
const ids = links.map(l => document.querySelector(l.getAttribute('href')));
const activate = (i) => {
    links.forEach(a => a.classList.remove('active'));
    if (links[i]) links[i].classList.add('active');
}
const onScroll = () => {
    let idx = 0; const top = window.scrollY + 1;
    for (let i = 0; i < ids.length; i++) {
        const s = ids[i];
        if (s && s.offsetTop <= top) idx = i;
    }
    activate(idx);
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();