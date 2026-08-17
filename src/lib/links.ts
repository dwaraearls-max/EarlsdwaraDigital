export function homeHashHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export function scrollToHash(href: string) {
  const id = href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : "";
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
