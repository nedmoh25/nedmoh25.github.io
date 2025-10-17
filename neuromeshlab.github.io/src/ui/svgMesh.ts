export function neuralMesh(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'mesh';

  // Create animated nodes and links
  const nodes = Array.from({ length: 10 }).map((_, i) => ({
    x: 40 + Math.random()*70,
    y: 20 + Math.random()*60,
    r: 4 + Math.random()*2,
    phase: Math.random()*Math.PI*2
  }));

  // Convert percent to px after mount
  const toPx = (pct: number, total: number) => (pct/100)*total;

  const links: Array<[number, number]> = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[2,7],[0,5]];

  const render = () => {
    const rect = wrap.getBoundingClientRect();
    wrap.innerHTML = '';
    nodes.forEach((n,i) => {
      const d = document.createElement('div');
      d.className = 'node float';
      const x = toPx(n.x, rect.width), y = toPx(n.y, rect.height);
      d.style.left = `${x}px`; d.style.top = `${y}px`;
      d.style.width = `${n.r*2}px`; d.style.height = `${n.r*2}px`;
      wrap.append(d);
    });
    links.forEach(([a,b]) => {
      const na = nodes[a], nb = nodes[b];
      const ax = toPx(na.x, rect.width), ay = toPx(na.y, rect.height);
      const bx = toPx(nb.x, rect.width), by = toPx(nb.y, rect.height);
      const dx = bx-ax, dy = by-ay;
      const len = Math.sqrt(dx*dx+dy*dy);
      const angle = Math.atan2(dy,dx) * 180/Math.PI;
      const l = document.createElement('div');
      l.className = 'link';
      l.style.left = `${ax}px`; l.style.top = `${ay}px`; l.style.width = `${len}px`; l.style.transform = `rotate(${angle}deg)`;
      wrap.append(l);
    });
  };

  const ro = new ResizeObserver(render);
  ro.observe(wrap);
  setTimeout(render);
  return wrap;
}


