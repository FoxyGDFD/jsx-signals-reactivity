import { effect } from "./signal.ts";

export function createElement(tag: any, props: any, ...children: any[]) {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }

  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(props || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (typeof value === "function") {
      effect(() => {
        el.setAttribute(key, value());
      });
    } else {
      el.setAttribute(key, value);
    }
  }

const resolveChild = (child: any): Node => {
  if (Array.isArray(child)) {
    const fragment = document.createDocumentFragment();
    child.forEach((c) => fragment.appendChild(resolveChild(c)));
    return fragment;
  }

  if (typeof child === "function") {
    let current = document.createTextNode("");
    effect(() => {
      const result = child();
      const next = resolveChild(result);
      current.replaceWith(next);
      current = next;
    });
    return current;
  }

  if (child instanceof Node) {
    return child;
  }

  return document.createTextNode(String(child ?? ""));
};

  children.flat().forEach((child) => {
    el.appendChild(resolveChild(child));
  });

  return el;
}
