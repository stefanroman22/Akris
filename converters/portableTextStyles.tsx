import { PortableTextComponents } from '@portabletext/react';

export const akrisComponents: PortableTextComponents = {
  block: {
    // Standard paragraph spacing
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-gray-300 last:mb-0">
        {children}
      </p>
    ),
    // Headings with generous top margin to separate sections
    h2: ({ children }) => (
      <h2 className="mt-12 mb-6 text-3xl font-black text-white uppercase tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 text-xl font-bold text-white uppercase">
        {children}
      </h3>
    ),
  },
  marks: {
    // Akris Green for bold text and links
    strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    link: ({ value, children }) => (
      <a 
        href={value?.href} 
        className="text-primary underline decoration-primary/30 underline-offset-4 hover:text-white hover:decoration-white transition-all"
      >
        {children}
      </a>
    ),
  },
  list: {
    // Custom list styling to match your table/grid styles
    bullet: ({ children }) => <ul className="mt-4 mb-8 space-y-3">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-gray-300">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        {children}
      </li>
    ),
  },
};