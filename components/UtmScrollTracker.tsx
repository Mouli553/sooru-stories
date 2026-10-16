"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

interface SectionMeta {
  id: string;
  name: string;
}

export default function UtmScrollTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeContentRef = useRef<string>("");
  const initialParamsRef = useRef<Map<string, string>>(new Map());

  // Capture incoming marketing params on initial arrival to avoid stripping external campaigns
  useEffect(() => {
    if (searchParams) {
      searchParams.forEach((value, key) => {
        initialParamsRef.current.set(key, value);
      });
    }
  }, [searchParams]);

  useEffect(() => {
    // Determine campaign name based on pathname
    const getCampaignName = (path: string): string => {
      if (path === "/") return "home";
      if (path === "/menu") return "menu_homestyle";
      if (path.startsWith("/menu/")) return "dish_story";
      if (path === "/contact") return "contact";
      if (path === "/delivery") return "delivery";
      if (path === "/account") return "account";
      return path.replace(/^\//, "").replace(/\//g, "_") || "site";
    };

    const campaign = getCampaignName(pathname);

    // Collect all observable sections with IDs
    const sectionIds: SectionMeta[] = [
      { id: "hero", name: "hero" },
      { id: "rasam", name: "rasam_elixirs" },
      { id: "menu-showcase", name: "menu_showcase" },
      { id: "menu-collections", name: "menu_collections" },
      { id: "menu-varieties", name: "menu_varieties" },
      { id: "story", name: "heritage_story" },
      { id: "testimonials", name: "guest_testimonials" },
      { id: "booking", name: "table_reservation" },
      { id: "contact-info", name: "contact_details" },
      { id: "footer", name: "site_footer" }
    ];

    const elements: HTMLElement[] = [];
    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) elements.push(el);
    });

    // If no explicit ID sections, observe major containers
    if (elements.length === 0) {
      const sections = document.querySelectorAll("main section, main > div > div");
      sections.forEach((sec, idx) => {
        if (!sec.id) sec.id = `section-${idx + 1}`;
        elements.push(sec as HTMLElement);
      });
    }

    if (elements.length === 0) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find entry with largest intersection ratio
        const visibleEntries = entries.filter((e) => e.isIntersecting && e.intersectionRatio >= 0.25);
        if (visibleEntries.length === 0) return;

        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topEntry = visibleEntries[0];
        const sectionId = topEntry.target.id;

        // Map section ID to readable UTM content tag
        const match = sectionIds.find((s) => s.id === sectionId);
        const contentName = match ? match.name : sectionId.replace(/-/g, "_");

        if (contentName === activeContentRef.current) return;
        activeContentRef.current = contentName;

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          try {
            const url = new URL(window.location.href);

            // Preserve initial external UTMs if user came via external ad/link, else brand defaults
            const currentSource = initialParamsRef.current.get("utm_source") || "sooru_stories";
            const currentMedium = initialParamsRef.current.get("utm_medium") || "scroll";
            const currentCampaign = initialParamsRef.current.get("utm_campaign") || campaign;

            url.searchParams.set("utm_source", currentSource);
            url.searchParams.set("utm_medium", currentMedium);
            url.searchParams.set("utm_campaign", currentCampaign);
            url.searchParams.set("utm_content", contentName);

            // Update browser URL silently without reload or scroll jump
            window.history.replaceState(null, "", url.toString());

            // Track GA4 scroll event
            trackEvent("scroll_utm_view", {
              utm_source: currentSource,
              utm_medium: currentMedium,
              utm_campaign: currentCampaign,
              utm_content: contentName,
              page_location: window.location.href,
              section_id: sectionId
            });
          } catch {
            // Silently handle any edge-case URL update restriction
          }
        }, 150);
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
