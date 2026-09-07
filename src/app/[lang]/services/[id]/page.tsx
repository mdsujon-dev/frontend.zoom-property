import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { PageHeader } from "@/components/layout/page-header";
import { services } from "@/data/services";
import { LOCALES } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { localeHref } from "@/i18n/href";
import { Button } from "@/components/ui/button";

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    services.map((service) => ({
      lang,
      id: service.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const serviceIndex = services.findIndex((s) => s.id === id);

  if (serviceIndex === -1) return {};

  const copy = dict.content.services[serviceIndex];

  return {
    title: `${copy.title} | Zoom Property Services`,
    description: copy.description,
    alternates: localeAlternates(locale, `/services/${id}`),
  };
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { id } = await params;
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const serviceIndex = services.findIndex((s) => s.id === id);

  if (serviceIndex === -1) notFound();

  const service = services[serviceIndex];
  const copy = dict.content.services[serviceIndex];

  return (
    <>
      <PageHeader
        eyebrow={dict.services?.title || "Specialized Advisory"}
        title={copy.title}
        description={copy.description}
        image={service.image}
      />

      <section className="bg-background py-16 sm:py-24">
        <AppContainer>
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb back link */}
            <div className="mb-8">
              <Link
                href={localeHref(locale, "/#services")}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon name="chevronLeft" size="xs" />
                <span>{locale === "bn" ? "হোম পেজে ফিরে যান" : "Back to Home"}</span>
              </Link>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 text-primary mb-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon name={service.icon} size="sm" />
                    </span>
                    <Heading as="h2" size="h4">
                      {copy.title}
                    </Heading>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {copy.description}
                  </p>

                  <div className="mt-8 border-t border-border pt-6">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                      {locale === "bn" ? "মূল সুবিধাসমূহ" : "Key Deliverables"}
                    </h3>
                    <ul className="space-y-3">
                      {[
                        locale === "bn"
                          ? "১০০% যাচাইকৃত ও রাজউক অনুমোদিত ডকুমেন্টেশন"
                          : "100% verified legal & RAJUK-compliant documentation",
                        locale === "bn"
                          ? "অভিজ্ঞ আর্কিটেক্ট ও ইঞ্জিনিয়ারিং টিম দ্বারা সাইট অডিট"
                          : "Full on-site inspection by licensed senior engineers",
                        locale === "bn"
                          ? "স্বচ্ছ ও গোপন খরচহীন সরাসরি চুক্তিপত্র"
                          : "Direct contract transparent pricing with zero markups",
                        locale === "bn"
                          ? "২৪/৭ ডেডিকেটেড অ্যাডভাইজরি সাপোর্ট"
                          : "Dedicated relationship advisor support on call",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                            <Icon name="check" size="xs" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar Action / Consultation Card */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {locale === "bn" ? "পরামর্শ নিতে চান?" : "Consult an Advisor"}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {locale === "bn"
                      ? "আমাদের প্রপার্টি ও লিগ্যাল এক্সপার্টরা আপনার যেকোনো জিজ্ঞাসায় সহায়তা করতে প্রস্তুত।"
                      : "Our in-house legal and structural team is ready to review your property documents."}
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button size="lg" className="w-full" asChild>
                      <Link href={localeHref(locale, "/contact")}>
                        {dict.nav.bookViewing}
                      </Link>
                    </Button>

                    <a
                      href="https://wa.me/8801958253301"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      <Icon name="whatsapp" size="xs" className="text-emerald-500" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppContainer>
      </section>
    </>
  );
}
