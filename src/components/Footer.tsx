import { Icon } from "@iconify/react";

export function Footer() {
  return (
    <footer className="w-full border-t mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon icon="mdi:license" className="w-5 h-5" />
            <span>Licensed under AGPLv3</span>
          </div>
          
          <a
            href="https://github.com/UmmItKin/offensive-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <Icon icon="mdi:github" className="w-5 h-5" />
            <span>UmmItKin/offensive-web</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
