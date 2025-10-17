import { I18n } from '../i18n';
import { Router, RouteName } from '../router';
import { pages } from './pages';

interface LayoutDeps { router: Router; i18n: I18n; }

export class Layout {
  public el: HTMLElement;
  private router: Router;
  private i18n: I18n;
  private content: HTMLElement;
  private sidebar: HTMLElement;

  constructor(deps: LayoutDeps){
    this.router = deps.router;
    this.i18n = deps.i18n;
    this.el = document.createElement('div');
    this.el.append(this.renderNav(), this.renderSidebar(), this.renderContent(), this.renderFooter());
    this.mount();
  }

  private renderNav(): HTMLElement {
    const nav = document.createElement('div');
    nav.className = 'nav';
    const inner = document.createElement('div');
    inner.className = 'nav-inner container';

    const brand = document.createElement('a');
    brand.href = this.router.link('home');
    brand.className = 'brand';
    brand.innerHTML = `<span class="dot"></span><span>NeuroMeshLab</span>`;
    brand.addEventListener('click', (e) => { e.preventDefault(); this.router.navigate('home'); });

    const links = document.createElement('div');
    links.className = 'nav-links';
    const names: RouteName[] = ['home','about','projects','team','researches','services','contact'];
    const mk = (n: RouteName) => {
      const a = document.createElement('a');
      a.href = this.router.link(n);
      a.textContent = this.i18n.t(n);
      a.addEventListener('click', (e) => { e.preventDefault(); this.router.navigate(n); });
      return a;
    };
    names.forEach((n) => links.append(mk(n)));

    const spacer = document.createElement('div');
    spacer.className = 'spacer';

    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-btn';
    menuBtn.textContent = '☰';
    menuBtn.addEventListener('click', () => this.sidebar.classList.toggle('open'));

    const langBtn = document.createElement('button');
    langBtn.className = 'lang-btn';
    langBtn.textContent = this.i18n.t('language');
    langBtn.addEventListener('click', () => this.i18n.toggle());

    inner.append(brand, links, spacer, menuBtn, langBtn);
    nav.append(inner);
    return nav;
  }

  private renderSidebar(): HTMLElement {
    const sb = document.createElement('aside');
    sb.className = 'sidebar';
    this.sidebar = sb;
    const sec = document.createElement('div');
    sec.className = 'section';
    const title = document.createElement('div');
    title.className = 'muted';
    title.textContent = this.i18n.t('sidebar');
    sec.append(title);
    const names: RouteName[] = ['home','about','projects','team','researches','services','contact'];
    names.forEach((n) => {
      const a = document.createElement('a');
      a.href = this.router.link(n);
      a.textContent = this.i18n.t(n);
      a.addEventListener('click', (e) => { e.preventDefault(); this.router.navigate(n); this.sidebar.classList.remove('open'); });
      sec.append(a);
    });
    sb.append(sec);
    return sb;
  }

  private renderContent(): HTMLElement {
    const content = document.createElement('main');
    content.className = 'container';
    this.content = content;
    this.updateContent(this.router.current());
    return content;
  }

  private renderFooter(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    const inner = document.createElement('div');
    inner.className = 'container footer-grid';
    const col1 = document.createElement('div');
    const h1 = document.createElement('h4'); h1.textContent = 'NeuroMeshLab';
    const p1 = document.createElement('p'); p1.className = 'muted'; p1.textContent = this.i18n.t('heroSub');
    col1.append(h1,p1);
    const mk = (title: string, items: Array<[string,string]>) => {
      const c = document.createElement('div');
      const h = document.createElement('h4'); h.textContent = title; c.append(h);
      items.forEach(([label,href]) => { const a = document.createElement('a'); a.href = href; a.textContent = label; a.style.display='block'; c.append(a); });
      return c;
    };
    const col2 = mk('Explore', [
      [this.i18n.t('projects'), '#/projects'],
      [this.i18n.t('researches'), '#/researches'],
      [this.i18n.t('services'), '#/services']
    ]);
    const col3 = mk('About', [
      [this.i18n.t('team'), '#/team'],
      [this.i18n.t('about'), '#/about']
    ]);
    const col4 = mk('Contact', [
      ['Email', 'mailto:hello@neuromeshlab.org']
    ]);
    inner.append(col1,col2,col3,col4);
    const bottom = document.createElement('div');
    bottom.className = 'container';
    bottom.style.paddingTop = '12px';
    bottom.textContent = `© ${new Date().getFullYear()} NeuroMeshLab — ` + this.i18n.t('madeWith');
    footer.append(inner,bottom);
    return footer;
  }

  private mount(): void {
    this.router.onChange((r) => this.updateContent(r));
    this.i18n.onChange(() => this.refreshTexts());
    this.refreshActiveLinks();
  }

  private refreshTexts(): void {
    // Re-render entire layout text bindings
    this.el.replaceChildren(this.renderNav(), this.renderSidebar(), this.renderContent(), this.renderFooter());
    this.mount();
  }

  private updateContent(route: RouteName): void {
    const page = pages[route](this.i18n, this.router);
    this.content.replaceChildren(page);
    this.refreshActiveLinks();
  }

  private refreshActiveLinks(): void {
    const current = this.router.current();
    this.el.querySelectorAll('.nav-links a, .sidebar a').forEach((a) => a.classList.remove('active'));
    const match = (a: Element) => (a as HTMLAnchorElement).hash.endsWith(`/${current}`);
    this.el.querySelectorAll('.nav-links a').forEach((a) => { if (match(a)) a.classList.add('active'); });
    this.el.querySelectorAll('.sidebar a').forEach((a) => { if (match(a)) a.classList.add('active'); });
  }
}


