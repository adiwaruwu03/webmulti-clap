import Image from "next/image";
import type { CSSProperties } from "react";
import { T } from "../../components/Lang";
import Odometer from "../../components/Odometer";

export const metadata = {
  title: "Tentang Kami",
  description: "Clapham Company menghargai orang-orang yang memiliki tujuan yang sama: mengubah kota tempat kita tinggal menjadi lebih baik.",
};

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const stats = [
  { value: "2016", id: "Berdiri Sejak", en: "Founded" },
  { value: "300+", id: "Event Terselenggara", en: "Events Hosted" },
  { value: "100+", id: "Brand Partner", en: "Brand Partners" },
  { value: "10K+", id: "Peserta Event", en: "Event Participants" },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-28 bg-card">
        <div className="container mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div className="reveal">
            <h1 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              <T
                en={
                  <>
                    Making a <span className="text-brick">difference.</span>
                  </>
                }
              >
                Membuat <span className="text-brick">perbedaan.</span>
              </T>
            </h1>
            <div className="space-y-6 text-muted-foreground text-lg leading-loose text-justify hyphens-auto">
              <p>
                <T en="Clapham Company values people who share the same goal: to transform a better city we live in.">
                  Clapham Company menghargai orang-orang yang memiliki tujuan yang
                  sama: mengubah kota tempat kita tinggal menjadi lebih baik.
                </T>
              </p>
              <p>
                <T en="Through our works, we aim to make differences, challenge the status quo, and push the best potential in our people. We are united in our vision for a better city, where our future generation can enjoy better lives and engage in meaningful works.">
                  Melalui karya kami, kami ingin membuat perbedaan, menantang
                  status quo, dan mendorong potensi terbaik dari setiap orang di
                  dalamnya. Kami bersatu dalam visi tentang kota yang lebih baik,
                  tempat generasi mendatang dapat menikmati kehidupan yang lebih
                  baik dan terlibat dalam pekerjaan yang bermakna.
                </T>
              </p>
              <p className="text-foreground font-medium">
                <T en="We are based in Medan.">Kami berbasis di Medan.</T>
              </p>
            </div>
          </div>
          <div className="reveal" style={i(1)}>
            <Image
              src="/foto-home/New%20folder/square.avif"
              alt="Nilai-nilai Clapham Co: kolaborasi, berbagi, belajar, karya berdampak, hati yang peduli"
              width={982}
              height={750}
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={90}
              loading="eager"
              fetchPriority="high"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="reveal md:order-1" style={i(1)}>
            <Image
              src="/foto-home/New%20folder/square2.avif"
              alt="Kolaborasi, semangat berbagi, budaya belajar, karya berdampak, hati yang peduli"
              width={1052}
              height={480}
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={90}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="reveal md:order-2">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              <T
                en={
                  <>
                    The <span className="text-brick">values</span> we believe in
                  </>
                }
              >
                <span className="text-brick">Nilai</span> yang kami yakini
              </T>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-loose text-justify hyphens-auto">
              <p>
                <T en="In every project we undertake, we strive to uphold the following values. We honor human dignity and its work, and apply good corporate governance as the foundation of trust.">
                  Dalam setiap proyek yang kami jalankan, kami berupaya menjunjung
                  tinggi nilai-nilai berikut. Kami memuliakan martabat manusia dan
                  karyanya, serta menerapkan tata kelola perusahaan yang baik
                  sebagai fondasi kepercayaan.
                </T>
              </p>
              <p>
                <T en="We believe in continuous learning, kindness in every interaction, and work that creates real impact. We bring all of this to life through active engagement with the communities around us.">
                  Kami percaya pada pembelajaran yang berkelanjutan, kebaikan hati
                  dalam setiap interaksi, dan karya yang berdampak nyata. Semua itu
                  kami wujudkan bersama dengan keterlibatan aktif bagi masyarakat di
                  sekitar kami.
                </T>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-chart-4/25 py-28">
        <div className="container mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <h2 className="reveal font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground md:text-4xl">
            <T
              en={
                <>
                  Designed with purpose, executed with <span className="text-brick">precision</span>
                </>
              }
            >
              Dirancang dengan tujuan, dieksekusi dengan <span className="text-brick">presisi</span>
            </T>
          </h2>
          <div className="reveal space-y-6 text-lg leading-loose text-muted-foreground md:text-justify" style={i(1)}>
            <p>
              <T en="Since 2016, Clapham Collective has served as a collaborative space and event ecosystem based in Medan. Starting as a coworking space, we have grown into a strategic partner for brands, organizations, and communities aiming to create meaningful experiences.">
                Sejak 2016, Clapham Collective telah hadir sebagai ruang kolaborasi dan ekosistem event yang berbasis di Medan. Berawal dari sebuah coworking space, kami berkembang menjadi mitra strategis bagi brand, organisasi, dan komunitas yang ingin menciptakan pengalaman bermakna.
              </T>
            </p>
            <p>
              <T en="We believe every event is an opportunity to build connections, inspire audiences, and deliver real impact. Our philosophy is simple: design with purpose, execute with precision, and always collaborate as partners.">
                Kami percaya bahwa setiap event adalah kesempatan untuk membangun koneksi, menginspirasi audiens, dan menghasilkan dampak nyata. Filosofi kami sederhana: merancang dengan tujuan, mengeksekusi dengan presisi, dan selalu berkolaborasi sebagai partner.
              </T>
            </p>
            <p>
              <T en="With experience managing hundreds of events from intimate gatherings to large conferences, we understand that success lies in careful attention to detail and strategic planning.">
                Dengan pengalaman mengelola ratusan event dari skala intim hingga konferensi besar, kami memahami bahwa kesuksesan terletak pada detail dan strategi yang matang.
              </T>
            </p>

            <dl className="!mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-foreground/15 pt-10 sm:grid-cols-4">
              {stats.map((st) => (
                <div key={st.id}>
                  <dd className="font-heading text-4xl font-semibold tracking-wide text-brick md:text-5xl">
                    <Odometer value={st.value} />
                  </dd>
                  <dt className="mt-2 text-base font-medium text-muted-foreground md:text-sm lg:text-base">
                    <T en={st.en}>{st.id}</T>
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
