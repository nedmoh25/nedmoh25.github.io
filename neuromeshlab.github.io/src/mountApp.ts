import { createRouter } from './router';
import { createI18n, Locale } from './i18n';
import { Layout } from './ui/Layout';

export function mountApp(root: HTMLElement): void {
  const i18n = createI18n();
  const router = createRouter();

  const layout = new Layout({ router, i18n });
  root.replaceChildren(layout.el);
}


