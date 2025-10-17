export type RouteName = 'home' | 'about' | 'projects' | 'team' | 'researches' | 'services' | 'contact';

export interface Router {
  navigate: (name: RouteName) => void;
  current: () => RouteName;
  onChange: (cb: (name: RouteName) => void) => () => void;
  link: (name: RouteName) => string;
}

const routes: RouteName[] = ['home','about','projects','team','researches','services','contact'];

function parseHash(): RouteName {
  const raw = (location.hash || '#/').replace(/^#\/?/, '');
  const name = raw.split('?')[0].split('/')[0] as RouteName;
  return routes.includes(name) ? name : 'home';
}

export function createRouter(): Router {
  let current: RouteName = parseHash();
  const listeners = new Set<(n: RouteName) => void>();

  const notify = (n: RouteName) => listeners.forEach((l) => l(n));

  const onHash = () => {
    const n = parseHash();
    if (n !== current) { current = n; notify(current); }
  };

  window.addEventListener('hashchange', onHash);

  return {
    navigate(name) { location.hash = `#/${name}`; },
    current() { return current; },
    onChange(cb) { listeners.add(cb); return () => listeners.delete(cb); },
    link(name) { return `#/${name}`; }
  };
}


