// Copy for the /layanan/* pages. [Indonesian, English] pairs. Prices come from the owner's brochure
// ("Brosur Clapham", 2026) and the podcast price list; do not invent numbers or inclusions.
export type L = [id: string, en: string];

export type Plan = {
  name: string | L;
  note?: L; // short line under the name, e.g. capacity
  price: string;
  unit?: L; // "/bulan"
  prefix?: L; // "mulai dari"
  image?: string;
  rows?: { label: L; price: string }[]; // extra price lines (hour / 6 hours / member rate)
  features?: L[];
};

export type Service = {
  slug: string;
  name: string;
  blurb: L; // one line, used in "other services"
  lead: L;
  from?: { price: string; unit: L };
  hero: string;
  title?: { pre: L; accent: L; post: L }; // visible h1 with one brick word; s.name stays in the h1 for SEO (sr-only)
  bentoTitle?: L;
  bento?: { t: L; d: L }[]; // feature cards, replace the "why" band on this page
  steps?: { t: L; d: L }[]; // overrides the default 3 steps
  map?: boolean; // embed a Google Map of the office in the location block
  art?: string; // illustration used instead of a photo (no real photo available yet)
  video?: string; // YouTube id, replaces the hero photo
  plansTitle: L;
  plans?: Plan[];
  highlights?: L[]; // short chips under the hero buttons
  matrix?: { label: L; v: (boolean | string | L)[] }[]; // comparison table, one value per plan
  includedTitle?: L;
  included?: L[];
  gallery: { src: string; alt: string }[];
  whyTitle: L;
  why: { t: L; d: L }[];
  usesTitle: L;
  uses: { t: L; d: L }[];
  ctaNote?: L;
  index: boolean; // false = keep noindex until the content is final
  meta: { title: string; description: string };
};

const MR = "/layanan/Meeting-Room";
const CW = "/layanan/Coworking-Space";
const PO = "/layanan/Private-Office";

export const services: Record<string, Service> = {
  "coworking-space": {
    slug: "coworking-space",
    name: "Coworking Space",
    blurb: ["Kursi fleksibel di ruang bersama yang hangat dan mendukung kolaborasi.", "Flexible seats in a warm shared space built for collaboration."],
    lead: [
      "Ruang kerja bersama yang nyaman di tengah kota Medan. Pilih DayPass untuk sehari, Flexible Desk untuk tempat duduk bebas, Dedicated Desk untuk meja milik Anda sendiri, atau Cube untuk tim.",
      "A comfortable shared workspace in the heart of Medan. Pick a DayPass for a day, Flexible Desk for a free seat, Dedicated Desk for a desk of your own, or Cube for a team.",
    ],
    from: { price: "Rp100.000", unit: ["/hari", "/day"] },
    hero: `${CW}/CA - Flexible Desk.jpeg`,
    plansTitle: ["Pilih paket keanggotaan", "Choose your membership"],
    highlights: [
      ["Internet di semua paket", "Internet on every plan"],
      ["Free flow drink", "Free flow drink"],
      ["Member's gathering", "Member's gatherings"],
    ],
    matrix: [
      { label: ["Hari kerja", "Working days"], v: [["5 hari", "5 days"], ["5 hari", "5 days"], ["5 hari", "5 days"], ["5 hari", "5 days"]] },
      { label: ["Internet", "Internet"], v: [true, true, true, true] },
      { label: ["Free flow drink", "Free flow drink"], v: [true, true, true, true] },
      { label: ["Member's gathering", "Member's gathering"], v: [true, true, true, true] },
      { label: ["Harga spesial untuk event", "Special price for events"], v: [["1 event", "1 event"], ["2 event", "2 events"], ["3 event", "3 events"], ["3 event", "3 events"]] },
      { label: ["Printing & copies", "Printing & copies"], v: [false, false, ["50 halaman", "50 pages"], ["100 halaman", "100 pages"]] },
      { label: ["Alamat surat (mailing address)", "Mailing address"], v: [false, true, true, true] },
      { label: ["Locker", "Locker"], v: [false, true, true, true] },
      { label: ["Meja milik sendiri (dedicated desk)", "A desk of your own (dedicated desk)"], v: [false, false, true, true] },
      { label: ["Bonus DayPass", "Bonus DayPass"], v: [false, "3", "5", "10"] },
      { label: ["Pemakaian meeting room", "Meeting room usage"], v: [false, ["3 jam", "3 hours"], ["8 jam", "8 hours"], ["12 jam", "12 hours"]] },
      { label: ["Papan nama di resepsionis", "Name plate at reception"], v: [false, true, true, true] },
      { label: ["Workshop", "Workshop"], v: [false, false, false, ["2 workshop", "2 workshops"]] },
    ],
    plans: [
      {
        name: "DayPass",
        price: "Rp100.000",
        unit: ["/hari", "/day"],
      },
      {
        name: "Flexible Desk",
        price: "Rp1.250.000",
        unit: ["/bulan", "/month"],
      },
      {
        name: "Dedicated Desk",
        price: "Rp2.250.000",
        unit: ["/bulan", "/month"],
      },
      {
        name: "Cube",
        prefix: ["mulai dari", "from"],
        price: "Rp5.000.000",
        unit: ["/bulan", "/month"],
      },
    ],
    gallery: [
      { src: `${CW}/7DBA37B6-4F58-43D0-8C19-D7647029C782-1726-000000EB215CEB66.jpg`, alt: "Mesin kopi di pantry" },
      { src: `${CW}/1F9BBDE9-E35F-4C66-91F1-E99E942B6302-1726-000000E070D6D00E.jpg`, alt: "Rak buku perpustakaan mini" },
      { src: `${CW}/1CC38082-7EA2-4C1D-A57D-2B785E71AC15-1726-000000D8D28B863E.jpg`, alt: "Booth kerja privat" },
      { src: `${CW}/99020CA2-AA3F-4B6C-8388-A89340DD8DD1-1726-000000D8CE1BAE43.jpg`, alt: "Booth fokus untuk panggilan dan kerja tenang" },
      { src: `${CW}/1EAF2755-EFA3-42AD-B771-5432EBB75471-1726-000000E3E9A7070A.jpg`, alt: "Meja panjang dan sudut baca" },
      { src: `${CW}/24205394-45A8-4CFD-81F6-637128486430-1726-000000DD3C77A811.jpg`, alt: "Pantry coworking space CLAPHAM.CO" },
      { src: `${CW}/C36DEBF4-9B40-42C3-A072-48FFD1E4AA0E-1726-000000E9ADF71666.jpg`, alt: "Meja kerja individual dengan sekat" },
      { src: `${CW}/23A428F3-B09D-435B-8476-068D3DD1F8E7-1726-000000D8B021C8D8.jpg`, alt: "Member bekerja di coworking space CLAPHAM.CO" },
      { src: `${CW}/7F246124-E588-4CBE-8F6C-8ADD8DC80F47-1726-000000E549EFCA4F.jpg`, alt: "Area kerja dengan rak buku dan meja bar" },
      { src: `${CW}/1st Floor -FD.jpeg`, alt: "Area resepsionis dan meja kerja" },
      { src: `${CW}/CA - Flexible Desk2.jpeg`, alt: "Suasana kerja di Flexible Desk" },
      { src: `${CW}/01680C53-9753-4098-B6B6-18D2367B9685-1726-000000DD1689BE8C.jpg`, alt: "Meja kerja bersama di coworking space CLAPHAM.CO" },
      { src: `${CW}/A7D4C77C-DE22-4243-92A3-67AD521A43EB-1726-000000EC3488E0DB.jpg`, alt: "Ruang ibadah" },
    ],
    whyTitle: ["Mengapa bekerja di CLAPHAM.CO", "Why work at CLAPHAM.CO"],
    why: [
      { t: ["Fleksibel sesuai kebutuhan", "Flexible by design"], d: ["Dari DayPass untuk sehari sampai Cube untuk tim, pilih paket yang sesuai ritme kerja Anda.", "From a one-day DayPass to a Cube for your team, pick the plan that fits how you work."] },
      { t: ["Fasilitas yang menunjang", "Facilities that help"], d: ["Internet, free flow drink, locker, dan alamat surat tersedia sesuai paket yang Anda pilih.", "Internet, free flow drinks, a locker, and a mailing address, depending on the plan you pick."] },
      { t: ["Komunitas yang saling mendukung", "A supportive community"], d: ["Member's gathering dan harga spesial untuk event membuat Anda mudah bertemu dan belajar dari sesama member.", "Member's gatherings and special event pricing make it easy to meet and learn from other members."] },
      { t: ["Lokasi strategis", "A central location"], d: ["Di pusat kota Medan, berjarak jalan kaki dari Stasiun Railink yang terhubung langsung ke Bandara Kuala Namu.", "In the heart of Medan, within walking distance of Railink Station and its direct link to Kuala Namu Airport."] },
    ],
    usesTitle: ["Cocok untuk", "Great for"],
    uses: [
      { t: ["Freelancer dan pekerja remote", "Freelancers and remote workers"], d: ["Ruang kerja tenang dengan internet, tanpa harus menyewa kantor sendiri.", "A calm place to work with internet, without renting an office of your own."] },
      { t: ["Startup dan tim kecil", "Startups and small teams"], d: ["Mulai dari satu meja, lalu tambah seiring tim Anda bertumbuh.", "Start with one desk, then add more as your team grows."] },
      { t: ["Profesional dan pelaku usaha", "Professionals and business owners"], d: ["Tempat bekerja sambil bertemu orang-orang baru di komunitas kami.", "A place to work while meeting new people in our community."] },
    ],
    index: true,
    meta: {
      title: "Coworking Space di Medan",
      description: "Coworking space di Medan: DayPass mulai Rp100.000, Flexible Desk, Dedicated Desk, dan Cube. Internet, free flow drink, dan komunitas.",
    },
  },

  "meeting-room": {
    slug: "meeting-room",
    name: "Meeting Room",
    blurb: ["Tiga ruang meeting dengan tarif per jam, 6 jam, dan 8 jam.", "Three meeting rooms with hourly, 6-hour, and 8-hour rates."],
    lead: [
      "Tiga ruang meeting di lantai 2 Ruko Centre Point Medan untuk rapat tim, presentasi, dan pertemuan dengan klien. Tarif per jam, 6 jam, atau 8 jam, dengan harga khusus untuk member.",
      "Three meeting rooms on the 2nd floor of Ruko Centre Point Medan for team meetings, presentations, and client sessions. Hourly, 6-hour, or 8-hour rates, with special pricing for members.",
    ],
    from: { price: "Rp165.000", unit: ["/jam", "/hour"] },
    hero: `${MR}/brosur-stephen.webp`,
    plansTitle: ["Pilih ruang meeting", "Choose a meeting room"],
    plans: [
      {
        name: "Stephen",
        note: ["Kapasitas 10 orang", "Seats 10 people"],
        image: `${MR}/stephen2.jpg`,
        price: "Rp220.000",
        unit: ["/jam", "/hour"],
        rows: [
          [["6 jam", "6 hours"], "Rp1.188.000"],
          [["8 jam", "8 hours"], "Rp1.408.000"],
          [["Tarif member", "Member rate"], "Rp137.500 /jam"],
        ].map(([label, price]) => ({ label: label as L, price: price as string })),
      },
      {
        name: "Newton",
        note: ["Kapasitas 6 orang", "Seats 6 people"],
        image: `${MR}/newton3.jpg`,
        price: "Rp165.000",
        unit: ["/jam", "/hour"],
        rows: [
          [["6 jam", "6 hours"], "Rp891.000"],
          [["8 jam", "8 hours"], "Rp1.056.000"],
          [["Tarif member", "Member rate"], "Rp82.500 /jam"],
        ].map(([label, price]) => ({ label: label as L, price: price as string })),
      },
      {
        name: "Elliot",
        note: ["Kapasitas 6 orang", "Seats 6 people"],
        image: `${MR}/elliot.jpeg`,
        price: "Rp165.000",
        unit: ["/jam", "/hour"],
        rows: [
          [["6 jam", "6 hours"], "Rp891.000"],
          [["8 jam", "8 hours"], "Rp1.056.000"],
          [["Tarif member", "Member rate"], "Rp82.500 /jam"],
        ].map(([label, price]) => ({ label: label as L, price: price as string })),
      },
    ],
    gallery: [
      { src: `${MR}/stephen.jpg`, alt: "Ruang meeting Stephen dengan pemandangan kota" },
      { src: `${MR}/Newton 01.jpeg`, alt: "Ruang meeting Newton dengan TV" },
      { src: `${MR}/stephen3.jpg`, alt: "Ruang meeting Stephen dengan TV dan meja panjang" },
      { src: `${MR}/newton2.jpg`, alt: "Meja ruang meeting Newton dan pemandangan kota" },
      { src: `${MR}/stephen4.jpg`, alt: "Ruang meeting Stephen dari sisi jendela" },
      { src: `${MR}/elliot.jpeg`, alt: "Ruang meeting Elliot dengan whiteboard" },
    ],
    whyTitle: ["Mengapa meeting di CLAPHAM.CO", "Why meet at CLAPHAM.CO"],
    why: [
      { t: ["Pilih ruang sesuai tim", "Right size for your team"], d: ["Stephen untuk 10 orang, Newton dan Elliot untuk 6 orang.", "Stephen seats 10, Newton and Elliot seat 6."] },
      { t: ["Tarif yang jelas", "Clear rates"], d: ["Tarif per jam, 6 jam, atau 8 jam, dan tarif member yang lebih hemat.", "Hourly, 6-hour, or 8-hour rates, with a lower rate for members."] },
      { t: ["Ruang yang nyaman", "A comfortable room"], d: ["Meja panjang, jendela besar, serta TV atau whiteboard untuk presentasi dan diskusi.", "Long tables, big windows, and a TV or whiteboard for presentations and discussion."] },
      { t: ["Mudah dijangkau", "Easy to reach"], d: ["Di pusat kota Medan, dekat Stasiun Railink dan pusat perbelanjaan.", "In central Medan, close to Railink Station and shopping centers."] },
    ],
    usesTitle: ["Cocok untuk", "Great for"],
    uses: [
      { t: ["Rapat tim dan briefing", "Team meetings and briefings"], d: ["Ruang tertutup agar diskusi tim tetap fokus.", "A closed room so team discussions stay focused."] },
      { t: ["Presentasi dan pertemuan klien", "Presentations and client meetings"], d: ["Tampil profesional di depan klien dan mitra bisnis.", "Look professional in front of clients and partners."] },
      { t: ["Interview, pelatihan, dan workshop kecil", "Interviews, training, and small workshops"], d: ["Ruang yang siap dipakai untuk kelompok kecil.", "A ready-to-use room for small groups."] },
    ],
    index: true,
    meta: {
      title: "Meeting Room di Medan",
      description: "Sewa meeting room di Medan: Stephen (10 orang) dan Newton serta Elliot (6 orang). Tarif per jam mulai Rp165.000, ada tarif khusus member.",
    },
  },

  "private-office": {
    slug: "private-office",
    name: "Private Office",
    blurb: ["Ruang kantor privat untuk 2 sampai 6 orang.", "Private office space for 2 to 6 people."],
    lead: [
      "Ruang kantor privat untuk tim kecil Anda, lengkap dengan meja dan kursi kerja. Pilih ukuran ruang sesuai jumlah orang, dari 2 sampai 6 orang.",
      "A private office for your small team, with work desks and chairs. Choose the room size by headcount, from 2 to 6 people.",
    ],
    from: { price: "Rp5.000.000", unit: ["/bulan", "/month"] },
    hero: `${PO}/brosur-private-office.webp`,
    plansTitle: ["Pilih ukuran ruang", "Choose a room size"],
    plans: [
      { name: ["2 orang", "2 people"], note: ["Ruang privat untuk 2 orang", "Private room for 2 people"], price: "Rp5.000.000", unit: ["/bulan", "/month"] },
      { name: ["3 orang", "3 people"], note: ["Ruang privat untuk 3 orang", "Private room for 3 people"], price: "Rp7.500.000", unit: ["/bulan", "/month"] },
      { name: ["5 orang", "5 people"], note: ["Ruang privat untuk 5 orang", "Private room for 5 people"], price: "Rp12.500.000", unit: ["/bulan", "/month"] },
      { name: ["6 orang", "6 people"], note: ["Ruang privat untuk 6 orang", "Private room for 6 people"], price: "Rp15.000.000", unit: ["/bulan", "/month"] },
    ],
    gallery: [
      { src: `${PO}/15696171-D198-4AB5-B28F-FC717377787E-1726-000000D87B20B704.jpg`, alt: "Private office dengan lemari dan jendela" },
      { src: `${PO}/430C5262-8B54-4B3C-92A4-BD636A1E6955-1726-000000DF4B488C6E.jpg`, alt: "Private office dengan dua meja kerja" },
      { src: `${PO}/5D0B2883-B605-4BC1-A039-B42F7213C842-1726-000000EBC616B5F8.jpg`, alt: "Private office dengan meja kerja bersama" },
      { src: `${PO}/87E3A4EF-100B-4221-A8F0-B0FA8B7D4B55-1726-000000EBB8D71276.jpg`, alt: "Private office untuk tim kecil" },
      { src: `${PO}/CLA1-Ven1.jpeg`, alt: "Private office dengan rak dinding" },
      { src: `${PO}/CLA2-Gra3.JPG`, alt: "Meja kerja panjang di private office" },
    ],
    whyTitle: ["Mengapa private office di CLAPHAM.CO", "Why a private office at CLAPHAM.CO"],
    why: [
      { t: ["Privat dan tenang", "Private and calm"], d: ["Ruang tertutup khusus untuk tim Anda, jauh dari keramaian.", "A closed room just for your team, away from the crowd."] },
      { t: ["Sesuai ukuran tim", "Sized to your team"], d: ["Pilihan ruang untuk 2, 3, 5, atau 6 orang.", "Rooms for 2, 3, 5, or 6 people."] },
      { t: ["Siap pakai", "Ready to use"], d: ["Meja dan kursi kerja sudah tersedia, Anda tinggal membawa laptop.", "Desks and chairs are in place, just bring your laptop."] },
      { t: ["Biaya yang terukur", "Predictable cost"], d: ["Tarif bulanan per ruangan, tanpa biaya renovasi atau perabot.", "A monthly rate per room, with no renovation or furniture costs."] },
    ],
    usesTitle: ["Cocok untuk", "Great for"],
    uses: [
      { t: ["Tim kecil perusahaan", "Small company teams"], d: ["Satu ruang untuk bekerja bersama dengan privasi yang terjaga.", "One room to work together with your privacy intact."] },
      { t: ["Startup yang sedang bertumbuh", "Growing startups"], d: ["Naik dari coworking ke ruang sendiri tanpa pindah lokasi.", "Move up from coworking to a room of your own without changing location."] },
      { t: ["Konsultan dan agensi", "Consultants and agencies"], d: ["Ruang kerja yang rapi untuk bertemu klien dan menjalankan proyek.", "A tidy workspace to meet clients and run projects."] },
    ],
    index: true,
    meta: {
      title: "Private Office di Medan",
      description: "Sewa private office di Medan untuk 2 sampai 6 orang, mulai Rp5.000.000 per bulan. Ruang kantor privat di Ruko Centre Point Medan.",
    },
  },

  "virtual-office": {
    slug: "virtual-office",
    name: "Virtual Office",
    blurb: ["Alamat bisnis di Ruko Centre Point Medan untuk perusahaan Anda.", "A business address at Ruko Centre Point Medan for your company."],
    lead: [
      "Gunakan alamat bisnis di Ruko Centre Point Medan untuk perusahaan Anda tanpa harus menyewa kantor penuh. Hubungi kami untuk detail paket dan penawaran.",
      "Use a business address at Ruko Centre Point Medan for your company without renting a full office. Contact us for package details and a quote.",
    ],
    title: { pre: ["Alamat Bisnis ", "A "], accent: ["Prestisius", "Prestigious"], post: [" di Pusat Kota Medan", " Business Address in Central Medan"] },
    bentoTitle: ["Apa yang Anda dapatkan", "What you get"],
    bento: [
      { t: ["Alamat bisnis di Centre Point Medan", "A business address at Centre Point Medan"], d: ["Gunakan alamat Komp. Ruko Centre Point Medan untuk identitas usaha Anda, di pusat kota dan dekat Stasiun Railink.", "Use the Komp. Ruko Centre Point Medan address for your company, in the city center near Railink Station."] },
      { t: ["Alamat surat", "Mailing address"], d: ["Surat untuk usaha Anda dikirim ke alamat kami. Tanyakan detail penanganan surat dan paket saat menghubungi tim.", "Mail for your business is sent to our address. Ask our team how letters and parcels are handled."] },
      { t: ["Meeting room & komunitas", "Meeting rooms & community"], d: ["Butuh bertemu klien? Sewa Stephen, Newton, atau Elliot per jam, dan ikut kegiatan komunitas CLAPHAM.CO.", "Meeting a client? Book Stephen, Newton, or Elliot by the hour, and join the CLAPHAM.CO community."] },
    ],
    steps: [
      { t: ["Pilih paket", "Pick a package"], d: ["Ceritakan kebutuhan usaha Anda, kami bantu pilihkan paket yang pas.", "Tell us about your business and we help you pick the right package."] },
      { t: ["Konfirmasi dengan tim", "Confirm with our team"], d: ["Tim kami menjelaskan persyaratan dan menjawab pertanyaan Anda. Singkat, tanpa ribet.", "Our team explains what is needed and answers your questions. Short and simple."] },
      { t: ["Alamat siap dipakai", "Address ready to use"], d: ["Mulai gunakan alamat Centre Point Medan untuk usaha Anda.", "Start using the Centre Point Medan address for your business."] },
    ],
    map: true,
    art: "/ilustrasi/virtual-office.svg",
    hero: `${CW}/7F246124-E588-4CBE-8F6C-8ADD8DC80F47-1726-000000E549EFCA4F.jpg`,
    plansTitle: ["", ""],
    includedTitle: ["Yang bisa Anda dapatkan", "What you can get"],
    included: [
      ["Alamat bisnis di Komp. Ruko Centre Point Medan", "A business address at Komp. Ruko Centre Point Medan"],
      ["Dapat digabung dengan meeting room atau coworking space sesuai kebutuhan", "Can be combined with a meeting room or coworking space as needed"],
    ],
    gallery: [],
    ctaNote: ["Paket dan harga virtual office diberikan setelah Anda menghubungi tim kami.", "Virtual office packages and prices are shared once you contact our team."],
    whyTitle: ["Mengapa virtual office di CLAPHAM.CO", "Why a virtual office at CLAPHAM.CO"],
    why: [
      { t: ["Alamat bisnis di lokasi strategis", "A business address in a central spot"], d: ["Perusahaan Anda hadir di Komp. Ruko Centre Point Medan, pusat kota Medan.", "Your company has a presence at Komp. Ruko Centre Point Medan, in central Medan."] },
      { t: ["Tanpa sewa kantor penuh", "No full office lease"], d: ["Cocok saat Anda belum memerlukan ruang kerja tetap.", "A good fit when you do not need a permanent workspace yet."] },
      { t: ["Bisa digabung layanan lain", "Combine with other services"], d: ["Tambahkan meeting room atau coworking space saat dibutuhkan.", "Add a meeting room or coworking space whenever you need one."] },
      { t: ["Penawaran sesuai kebutuhan", "A quote that fits"], d: ["Tim kami menyusun paket berdasarkan kebutuhan bisnis Anda.", "Our team puts a package together based on your business needs."] },
    ],
    usesTitle: ["Cocok untuk", "Great for"],
    uses: [
      { t: ["UMKM dan startup", "Small businesses and startups"], d: ["Punya alamat usaha yang jelas sejak awal.", "Have a clear business address from day one."] },
      { t: ["Freelancer dan konsultan", "Freelancers and consultants"], d: ["Tampil lebih profesional di depan klien.", "Look more professional in front of clients."] },
      { t: ["Perusahaan yang ingin hadir di Medan", "Companies that want a presence in Medan"], d: ["Membuka representasi tanpa menyewa kantor sendiri.", "Open a presence without leasing an office."] },
    ],
    index: false, // owner has not supplied package details yet
    meta: {
      title: "Virtual Office di Medan",
      description: "Virtual office di Medan: alamat bisnis di Ruko Centre Point Medan untuk perusahaan Anda. Hubungi CLAPHAM.CO untuk penawaran.",
    },
  },

  "podcast-studio": {
    slug: "podcast-studio",
    name: "Podcast Studio",
    blurb: ["Studio podcast dengan kamera, mikrofon, dan operator standby.", "A podcast studio with cameras, microphones, and a standby operator."],
    lead: [
      "Studio podcast siap pakai dengan 3 kamera, 2 mikrofon, mixer audio, dan operator yang standby. Pilih Record Only untuk file rekaman, atau Ready to Post untuk hasil yang langsung siap diunggah.",
      "A ready-to-use podcast studio with 3 cameras, 2 microphones, an audio mixer, and a standby operator. Pick Record Only for the recording files, or Ready to Post for results that are ready to upload.",
    ],
    from: { price: "Rp299.000", unit: ["/jam", "/hour"] },
    hero: "",
    video: "pJ1xKfAnqUI",
    plansTitle: ["Paket sewa studio", "Studio rental packages"],
    plans: [
      {
        name: "Record Only",
        price: "Rp299.000",
        unit: ["/jam", "/hour"],
        features: [
          ["File rekaman 3 sudut kamera", "Recording files from 3 camera angles"],
          ["Sinkronisasi audio dan video", "Audio-video synchronization"],
        ],
      },
      {
        name: "Ready to Post",
        price: "Rp599.000",
        unit: ["/jam", "/hour"],
        features: [
          ["Semua hasil Record Only, dengan sinkronisasi audio dan video", "Everything in Record Only, with audio-video synchronization"],
          ["Thumbnail", "Thumbnail"],
          ["Deskripsi YouTube", "YouTube description"],
          ["Highlight moment", "Highlight moment"],
          ["Caption", "Caption"],
          ["Animasi / motion graphic dasar", "Animation / basic motion graphics"],
        ],
      },
    ],
    includedTitle: ["Peralatan dan fasilitas", "Equipment and facilities"],
    included: [
      ["Mikrofon podcast (2 unit)", "Podcast microphones (2 units)"],
      ["Kamera Sony A6400 lensa 50mm (2 unit) dan lensa 16mm (1 unit)", "Sony A6400 cameras with a 50mm lens (2 units) and a 16mm lens (1 unit)"],
      ["Mixer audio", "Audio mixer"],
      ["Ruangan maksimal 6 orang (15 m²), full AC", "Room for up to 6 people (15 m²), fully air-conditioned"],
      ["Listrik dan WiFi", "Electricity and WiFi"],
      ["Free flow drink (kopi, teh, dan air mineral)", "Free flow drinks (coffee, tea, and mineral water)"],
      ["Operator standby", "Standby operator"],
    ],
    gallery: [],
    whyTitle: ["Mengapa rekaman di CLAPHAM.CO", "Why record at CLAPHAM.CO"],
    why: [
      { t: ["Peralatan siap pakai", "Equipment ready to go"], d: ["3 kamera Sony A6400, 2 mikrofon podcast, dan mixer audio sudah disiapkan.", "3 Sony A6400 cameras, 2 podcast microphones, and an audio mixer are set up for you."] },
      { t: ["Operator standby", "A standby operator"], d: ["Anda cukup fokus berbicara, urusan teknis kami yang atur.", "You focus on talking, we handle the technical side."] },
      { t: ["Dua pilihan paket", "Two packages"], d: ["Record Only untuk file rekaman, atau Ready to Post untuk hasil yang siap diunggah.", "Record Only for the recording files, or Ready to Post for results ready to upload."] },
      { t: ["Ruang yang nyaman", "A comfortable room"], d: ["Ruangan full AC untuk maksimal 6 orang, dengan free flow kopi, teh, dan air mineral.", "A fully air-conditioned room for up to 6 people, with free-flowing coffee, tea, and water."] },
    ],
    usesTitle: ["Cocok untuk", "Great for"],
    uses: [
      { t: ["Podcaster dan kreator konten", "Podcasters and content creators"], d: ["Rekaman dengan kualitas gambar dan suara yang rapi.", "Record with clean picture and sound."] },
      { t: ["Bisnis dan brand", "Businesses and brands"], d: ["Bangun konten percakapan untuk pemasaran dan edukasi pelanggan.", "Build conversation content for marketing and customer education."] },
      { t: ["Komunitas dan organisasi", "Communities and organizations"], d: ["Dokumentasikan diskusi, wawancara, dan cerita komunitas Anda.", "Document discussions, interviews, and your community stories."] },
    ],
    index: true,
    meta: {
      title: "Podcast Studio di Medan",
      description: "Sewa studio podcast di Medan: Record Only Rp299.000/jam dan Ready to Post Rp599.000/jam. 3 kamera, 2 mikrofon, operator standby.",
    },
  },
};

// Order used in "other services" (same as the navbar dropdown)
export const serviceOrder: { slug: string; name: string; blurb: L }[] = [
  ...["coworking-space", "private-office", "meeting-room"].map((s) => ({ slug: s, name: services[s].name, blurb: services[s].blurb })),
  ...["virtual-office"].map((s) => ({ slug: s, name: services[s].name, blurb: services[s].blurb })),
  { slug: "event-management", name: "Event Management Service", blurb: ["Konsep, produksi, penyelenggaraan, dan dokumentasi acara.", "Concept, production, organizing, and documentation of events."] as L },
  { slug: "podcast-studio", name: "Podcast Studio", blurb: services["podcast-studio"].blurb },
];
