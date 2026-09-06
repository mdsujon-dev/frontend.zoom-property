import { Container } from "@/components/common/container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { mainNav, siteConfig, socialLinks } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 font-heading text-h6 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icon name="building" size="sm" />
              </span>
              {siteConfig.name}
            </span>
            <Text size="sm" className="max-w-sm">
              {siteConfig.description}
            </Text>
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="ghost"
                  size="icon-lg"
                  className="rounded-full"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size="sm" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <Heading as="h3" size="h6">
              Explore
            </Heading>
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <Heading as="h3" size="h6">
              New listings, weekly
            </Heading>
            <Text size="sm">
              One email, every Thursday. The homes worth a second look.
            </Text>
            <form className="flex gap-2 pt-1">
              <Input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Text size="xs">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </Text>
          <Text size="xs">Built with Next.js, Tailwind CSS and shadcn/ui.</Text>
        </div>
      </Container>
    </footer>
  );
}
