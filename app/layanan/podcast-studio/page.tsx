import type { Metadata } from "next";
import ServicePage from "../../../components/service/ServicePage";
import { services } from "../../../lib/services";

const slug = "podcast-studio";

export const metadata: Metadata = {
  ...services[slug].meta,
  alternates: { canonical: `/layanan/${slug}` },
};

export default function PodcastStudioPage() {
  return <ServicePage slug={slug} />;
}
