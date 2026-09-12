import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/data/projects";
import type { Locale } from "@/i18n/config";

interface ConsultantCardProps {
  agent: Agent;
  locale?: Locale;
}

export function ConsultantCard({ agent, locale = "en" }: ConsultantCardProps) {
  const isBn = locale === "bn";
  const name = isBn && agent.nameBn ? agent.nameBn : agent.name;
  const role = isBn && agent.roleBn ? agent.roleBn : agent.role;

  const handleCall = () => {
    window.location.href = `tel:${agent.phone}`;
  };

  const handleWhatsApp = () => {
    const formattedPhone = agent.phone.replace(/[^0-9+]/g, "");
    window.location.href = `https://wa.me/${formattedPhone}`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
      <Text
        size="sm"
        className="font-bold text-foreground mb-4 uppercase tracking-wider text-xs"
      >
        {isBn ? "আপনার পরামর্শক" : "Your Consultant"}
      </Text>

      <div className="flex items-center gap-4 mb-4">
        <ImageFrame
          src={agent.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80"}
          alt={name}
          ratio="square"
          sizes="64px"
          className="size-16 rounded-full object-cover shrink-0 ring-2 ring-primary/10"
        />
        <div className="flex flex-col">
          <Text size="base" className="font-bold text-foreground leading-tight">
            {name}
          </Text>
          <Text size="sm" className="text-muted-foreground mb-1">
            {role}
          </Text>
          {agent.rating && agent.deals ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon name="star" size="xs" className="text-amber-500 fill-amber-500" />
              <span>
                {agent.rating} · {isBn ? `${agent.deals}টি ডিল সম্পন্ন` : `${agent.deals} deals completed`}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <Text size="sm" className="text-muted-foreground mb-5 leading-relaxed">
        {isBn
          ? "পারমিট, পরিদর্শনের ছবি, বা এই সপ্তাহে সাইট ভিজিটের কথা জিজ্ঞেস করুন।"
          : "Ask about permits, inspection photos, or scheduling a site visit this week."}
      </Text>

      <div className="flex flex-col gap-2.5">
        <Button
          onClick={handleCall}
          className="w-full bg-[#497A32] hover:bg-[#3D662A] text-white font-medium h-11"
        >
          <Icon name="phone" size="sm" className="mr-2" />
          {isBn ? "কল" : "Call"}
        </Button>
        <Button
          variant="outline"
          onClick={handleWhatsApp}
          className="w-full font-medium h-11 hover:bg-slate-50 border-gray-300"
        >
          <Icon name="whatsapp" size="sm" className="mr-2 text-green-600" />
          {isBn ? "হোয়াটসঅ্যাপ" : "WhatsApp"}
        </Button>
      </div>
    </div>
  );
}
