import type { Metadata } from "next";
import ServicePage from "../../../components/service/ServicePage";
import { services } from "../../../lib/services";

const slug = "meeting-room";

export const metadata: Metadata = {
  ...services[slug].meta,
  alternates: { canonical: `/layanan/${slug}` },
};

export default function MeetingRoomPage() {
  return <ServicePage slug={slug} />;
}
