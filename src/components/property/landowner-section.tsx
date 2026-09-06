"use client";

import { useState } from "react";
import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { landownerBenefits, landmarkJVProjects } from "@/data/landowner";
import { ImageFrame } from "@/components/media/image-frame";

export function LandownerSection() {
  const [katha, setKatha] = useState<number>(10);
  const [selectedZone, setSelectedZone] = useState<string>("gulshan");

  // Approximate yield estimation based on Dhaka DAP FAR (Floor Area Ratio)
  const estimatedFloors = selectedZone === "gulshan" || selectedZone === "baridhara" ? 14 : 10;
  const estimatedTotalSft = katha * 720 * (estimatedFloors * 0.65);
  const ownerShareSft = Math.round(estimatedTotalSft * 0.52);

  return (
    <div className="flex flex-col gap-12">
      {/* Top Banner & Benefit Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {landownerBenefits.map((benefit) => (
          <Card
            key={benefit.title}
            className="border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:bg-secondary"
          >
            <CardContent className="flex flex-col gap-3 p-0">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
                <Icon name={benefit.icon} size="sm" />
              </span>
              <Heading as="h3" size="h6" className="text-foreground">
                {benefit.title}
              </Heading>
              <Text size="xs" className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </Text>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Land Feasibility Calculator Box */}
      <div className="rounded-2xl border border-primary/25 bg-muted/50 p-6 sm:p-10 brand-glow-subtle">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Description & Inputs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <Icon name="building" size="xs" />
                Joint-Venture Feasibility Calculator
              </span>
              <Heading as="h3" size="h3" className="text-foreground">
                Calculate Your Land&apos;s Development Potential
              </Heading>
              <Text size="sm" className="text-muted-foreground">
                Enter your plot size and zone to calculate estimated built-up area and your guaranteed 52% owner share under current RAJUK DAP guidelines.
              </Text>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Zone Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Location / Zone
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="h-11 rounded-xl border border-primary/20 bg-secondary px-3 text-sm text-foreground focus:border-primary outline-none"
                >
                  <option value="gulshan">Gulshan 1 & 2 (DAP Priority)</option>
                  <option value="baridhara">Baridhara Diplomatic Enclave</option>
                  <option value="banani">Banani (Residential / Mixed)</option>
                  <option value="dhanmondi">Dhanmondi Lakeside</option>
                  <option value="uttara">Uttara Sectors (Airport Expy)</option>
                  <option value="bashundhara">Bashundhara R/A (Blocks A-I)</option>
                </select>
              </div>

              {/* Katha input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Land Size ({katha} Katha)
                  </label>
                  <span className="text-xs font-bold text-primary">
                    ~{(katha * 720).toLocaleString()} Sq Ft Land
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={40}
                  step={1}
                  value={katha}
                  onChange={(e) => setKatha(Number(e.target.value))}
                  className="h-2 w-full mt-3 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>4 Katha</span>
                  <span>15 Katha</span>
                  <span>40 Katha</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Yield Readout Box */}
          <div className="lg:col-span-5 rounded-xl border border-primary/30 bg-muted/40 p-6 flex flex-col gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Estimated Owner Return Estimate:
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Your 52% Owner Built Area:</span>
              <span className="font-heading text-3xl font-extrabold text-primary">
                ~{ownerShareSft.toLocaleString()} Sq Ft
              </span>
              <span className="text-xs text-muted-foreground">
                Equivalent to ~{Math.round(ownerShareSft / 3200)} Signature Luxury Apartments
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-border text-muted-foreground">
              <div>
                <span>Max Floors Allowed:</span>
                <strong className="block text-foreground">{estimatedFloors} Floors</strong>
              </div>
              <div>
                <span>Signing Advance:</span>
                <strong className="block text-primary">Bank Escrow Protected</strong>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-2"
              asChild
            >
              <a href="tel:+8801958253301">
                <Icon name="phone" size="xs" />
                Schedule Confidential Landowner Review
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Completed Landmark JV Projects */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">
              Track Record
            </span>
            <Heading as="h4" size="h5" className="text-foreground">
              Delivered Landowner Landmark Collaborations
            </Heading>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {landmarkJVProjects.map((jv) => (
            <div
              key={jv.name}
              className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50"
            >
              <div className="w-full sm:w-44 shrink-0 overflow-hidden rounded-xl">
                <ImageFrame
                  src={jv.image}
                  alt={jv.name}
                  ratio="4/3"
                  rounded="xl"
                  sizes="thumb"
                />
              </div>
              <div className="flex flex-col justify-center gap-1.5 py-1">
                <span className="text-[11px] text-primary uppercase font-bold">
                  Completed {jv.completedYear} · Handed Over On-Time
                </span>
                <Heading as="h5" size="h6" className="text-foreground">
                  {jv.name}
                </Heading>
                <Text size="xs" className="text-muted-foreground">
                  {jv.location}
                </Text>
                <div className="flex items-center gap-3 text-xs pt-2 border-t border-border mt-1 text-foreground/80 font-medium">
                  <span>{jv.landSizeKatha} Katha</span>
                  <span>·</span>
                  <span>{jv.floors} Storeys</span>
                  <span>·</span>
                  <span className="text-primary font-bold">{jv.ownerSharePercent}% Owner Share</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
