import { ArrowRight, MoonStar, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-20 sm:px-10">
        <header className="flex flex-col gap-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>shadcn/ui is wired up</span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Anchored Contract Dashboard
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Build quickly with composable primitives. We added the shadcn/ui
              design tokens, utilities, and a base button to kickstart the
              component library.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button className="gap-2">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary">View components</Button>
            <Button variant="ghost" size="icon" aria-label="Minimal action">
              <Sparkles className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground">
              Ready to extend
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Shared design tokens
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Colors, radii, and typography now come from CSS variables so new
              components stay consistent across themes.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground">
              Utilities included
            </p>
            <h2 className="mt-2 text-xl font-semibold">Button primitive</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Reuse the `Button` variants across pages, or use the `cn` helper
              to merge Tailwind classes in your own components.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
              <MoonStar className="h-4 w-4" />
              Dark mode ready
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
