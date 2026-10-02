import Image from "next/image";
import type { CSSProperties } from "react";

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
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              Membuat <span className="text-brick">perbedaan.</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-loose text-justify hyphens-auto">
              <p>
                Clapham Company menghargai orang-orang yang memiliki tujuan yang
                sama: mengubah kota tempat kita tinggal menjadi lebih baik.
              </p>
              <p>
                Melalui karya kami, kami ingin membuat perbedaan, menantang
                status quo, dan mendorong potensi terbaik dari setiap orang di
                dalamnya. Kami bersatu dalam visi tentang kota yang lebih baik,
                tempat generasi mendatang dapat menikmati kehidupan yang lebih
                baik dan terlibat dalam pekerjaan yang bermakna.
              </p>
              <p className="text-foreground font-medium">Kami berbasis di Medan.</p>
            </div>
          </div>
          <div className="reveal" style={i(1)}>
            <Image
              src="/foto-home/New%20folder/square.avif"
              alt="Nilai-nilai Clapham Co: kolaborasi, berbagi, belajar, karya berdampak, hati yang peduli"
              width={982}
              height={750}
              sizes="(min-width: 768px) 50vw, 100vw"
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
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="reveal md:order-2">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              <span className="text-brick">Nilai</span> yang kami yakini
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-loose text-justify hyphens-auto">
              <p>
                Dalam setiap proyek yang kami jalankan, kami berupaya menjunjung
                tinggi nilai-nilai berikut. Kami memuliakan martabat manusia dan
                karyanya, serta menerapkan tata kelola perusahaan yang baik
                sebagai fondasi kepercayaan.
              </p>
              <p>
                Kami percaya pada pembelajaran yang berkelanjutan, kebaikan hati
                dalam setiap interaksi, dan karya yang berdampak nyata. Semua itu
                kami wujudkan bersama dengan keterlibatan aktif bagi masyarakat di
                sekitar kami.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
