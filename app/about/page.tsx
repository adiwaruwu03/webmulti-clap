import Image from "next/image";
import type { CSSProperties } from "react";
import { T } from "../../components/Lang";

export const metadata = {
  title: "Tentang Kami",
  description: "Clapham Company menghargai orang-orang yang memiliki tujuan yang sama: mengubah kota tempat kita tinggal menjadi lebih baik.",
};

const i = (n: number) => ({ "--i": n }) as CSSProperties;

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
    </>
  );
}
