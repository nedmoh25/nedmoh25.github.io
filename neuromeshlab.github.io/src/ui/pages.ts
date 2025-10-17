import { I18n } from '../i18n';
import { Router } from '../router';
import { neuralMesh } from './svgMesh';
import { sample } from './sampleData';
import { Slider } from './Slider';

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string){
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

export const pages = {
  home(i18n: I18n, router: Router){
    const wrap = el('div');
    const hero = el('section','hero');
    const left = el('div');
    const title = el('h1','tagline', i18n.t('tagline'));
    const subtitle = el('p','subtitle', i18n.t('heroSub'));
    const cta = el('div','cta');
    const btn1 = el('button','btn', i18n.t('learnMore')) as HTMLButtonElement;
    btn1.onclick = () => router.navigate('about');
    const btn2 = el('button','btn outline', i18n.t('getInTouch')) as HTMLButtonElement;
    btn2.onclick = () => router.navigate('contact');
    cta.append(btn1, btn2);
    left.append(title, subtitle, cta);
    const right = el('div');
    const vid = document.createElement('video');
    vid.src = 'https://neuro.gatech.edu/sites/default/files/2023-10/Neuro%20Next%20Initiative%20homepage%20animation.mp4';
    vid.autoplay = true; vid.loop = true; vid.muted = true; vid.playsInline = true; vid.style.width='100%'; vid.style.borderRadius='12px';
    right.append(vid);
    hero.append(left,right);

    const slider = new Slider(sample.slides).el;
    const grid = el('div','grid');
    sample.projects.slice(0,3).forEach((p) => {
      const card = el('div','card');
      card.innerHTML = `<h3>${p.title}</h3><div class="muted">${p.summary}</div>`;
      grid.append(card);
    });

    wrap.append(hero, slider, el('h2','', i18n.t('featuredProjects')), grid);
    return wrap;
  },

  about(i18n: I18n){
    const wrap = el('div');
    const h = el('h2','', i18n.t('about'));
    const p = el('p','muted', 'We are an independent scientific lab focused on multimodal neuroimaging and cognitive task design.');
    wrap.append(h,p);
    return wrap;
  },

  projects(i18n: I18n){
    const wrap = el('div');
    wrap.append(el('h2','', i18n.t('projects')));
    const grid = el('div','grid');
    sample.projects.forEach((p) => {
      const card = el('div','card');
      card.innerHTML = `<h3>${p.title}</h3><div class="muted">${p.summary}</div>`;
      grid.append(card);
    });
    wrap.append(grid);
    return wrap;
  },

  team(i18n: I18n){
    const wrap = el('div');
    wrap.append(el('h2','', i18n.t('team')));
    const grid = el('div','grid');
    sample.team.forEach((m) => {
      const card = el('div','card');
      card.innerHTML = `<h3>${m.name}</h3><div class="muted">${m.role}</div>`;
      grid.append(card);
    });
    wrap.append(grid);
    return wrap;
  },

  researches(i18n: I18n){
    const wrap = el('div');
    wrap.append(el('h2','', i18n.t('publications')));
    const list = el('div');
    sample.publications.forEach((pub) => {
      const card = el('div','card');
      card.innerHTML = `<div>${pub.title}</div><div class="muted">${pub.citation}</div>`;
      list.append(card);
    });
    wrap.append(list);
    return wrap;
  },

  services(i18n: I18n){
    const wrap = el('div');
    wrap.append(el('h2','', i18n.t('services')));
    const grid = el('div','grid');
    const modal = document.createElement('dialog');
    modal.style.width='min(800px, 92vw)';
    modal.style.border='1px solid var(--border)';
    modal.style.borderRadius='12px';
    const openDetail = (s: any) => {
      modal.innerHTML = '';
      const box = el('div','container');
      const title = el('h3','', s.name);
      const body = el('div','');
      body.innerHTML = `<p>${s.detail}</p>`;
      if (s.media && s.media.length){
        const gallery = el('div','grid');
        s.media.forEach((m: any) => {
          const c = el('div','card');
          if (m.type==='image'){ const img = document.createElement('img'); img.src=m.src; img.alt=''; img.style.width='100%'; c.append(img); }
          if (m.type==='video'){ const v = document.createElement('video'); v.src=m.src; v.controls=true; v.style.width='100%'; c.append(v); }
          gallery.append(c);
        });
        box.append(gallery);
      }
      const close = document.createElement('button'); close.className='btn outline'; close.textContent=i18n.t('close'); close.onclick = () => modal.close();
      box.append(title, body, close);
      modal.append(box);
      if (!modal.open) modal.showModal();
    };
    sample.services.forEach((s) => {
      const card = el('div','card');
      const btn = el('button','btn outline', i18n.t('details')) as HTMLButtonElement;
      btn.onclick = () => openDetail(s);
      card.innerHTML = `<h3>${s.name}</h3><div class=\"muted\">${s.desc}</div>`;
      card.append(btn);
      grid.append(card);
    });
    wrap.append(grid, modal);
    return wrap;
  },

  contact(i18n: I18n){
    const wrap = el('div');
    wrap.append(el('h2','', i18n.t('contact')));
    const card = el('div','card');
    card.innerHTML = `
      <div>Email: <a href="mailto:hello@neuromeshlab.org">hello@neuromeshlab.org</a></div>
      <div class="muted">We usually reply in 2-3 business days.</div>
    `;
    wrap.append(card);
    return wrap;
  }
};


