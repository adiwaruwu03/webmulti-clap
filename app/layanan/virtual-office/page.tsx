import type { Metadata } from "next";
import ServicePage from "../../../components/service/ServicePage";
import { services } from "../../../lib/services";

const slug = "virtual-office";

export const metadata: Metadata = {
  ...services[slug].meta,
  alternates: { canonical: `/layanan/${slug}` },
  robots: services[slug].index ? undefined : { index: false, follow: true }, // virtual office stays noindex until the owner sends package details
};

export default function VirtualOfficePage() {
  return <ServicePage slug={slug} />;
}
