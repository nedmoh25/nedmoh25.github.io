export interface SlideItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export class Slider {
  public el: HTMLElement;
  private track: HTMLElement;
  private index = 0;
  private timer?: number;
  private items: SlideItem[];

  constructor(items: SlideItem[]){
    this.items = items;
    this.el = document.createElement('div');
    this.el.className = 'slider';
    this.track = document.createElement('div');
    this.track.className = 'slider-track';
    this.el.append(this.track, this.controls());
    this.render();
    this.start();
  }

  private render(){
    this.track.innerHTML = '';
    this.items.forEach((it) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      if (it.type === 'image'){
        const img = document.createElement('img');
        img.src = it.src; img.alt = it.alt || '';
        slide.append(img);
      } else {
        const vid = document.createElement('video');
        vid.src = it.src; vid.controls = true; vid.playsInline = true; vid.preload = 'metadata';
        slide.append(vid);
      }
      this.track.append(slide);
    });
    this.update();
  }

  private controls(){
    const wrap = document.createElement('div');
    wrap.className = 'slider-controls';
    const prev = document.createElement('button'); prev.textContent = '‹';
    const next = document.createElement('button'); next.textContent = '›';
    prev.onclick = () => this.move(-1);
    next.onclick = () => this.move(1);
    wrap.append(prev,next);
    return wrap;
  }

  private move(delta: number){
    this.index = (this.index + delta + this.items.length) % this.items.length;
    this.update();
    this.restart();
  }

  private update(){
    const offset = -this.index * 100;
    this.track.style.transform = `translateX(${offset}%)`;
  }

  private start(){
    this.timer = window.setInterval(() => this.move(1), 5000);
  }
  private restart(){
    if (this.timer) window.clearInterval(this.timer);
    this.start();
  }
}


