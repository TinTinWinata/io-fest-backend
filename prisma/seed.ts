import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';
import { createForum } from '../src/databases/forum.database';

const prisma = new PrismaClient();

interface IExampleText {
  title: string;
  description: string;
}

const EXAMPLE_TEXT: IExampleText[] = [
  {
    title: 'Makanan dan vitamin yang dapat mencegah menopause dini',
    description:
      'Maaf dokter, saya ingin bertanya, dulu mama saya menopause saat usianya 52 tahun. Sekarang usia saya 39 tahun saya haidnya sekarang 3 hari, saya takut ini adalah gejala menopause dini. Cara mencegah menopause dini itu saya harus bagaimana dok? apakah ada makanan atau vitamin yag bisa saya konsumsi rutin sbg pencegahan?',
  },
  {
    title:
      'Bolehkah menggunakan obat amoxicillin untuk sakit gigi akibat gusi bengkak?',
    description:
      'bu saya lagi sakit gigi dan biasanya saya kalo lagi sakit gigi saya minumin amoxicillin.. kalo saya kasihkan ke ibu saya apakah boleh dok?',
  },
  {
    title: 'Muncul gumpalan darah setelah cabut jahitan luka',
    description:
      'Alodokter., maaf dok mau nanya. Saya sebulan lalu kecelakaan dan kaki saya robek 10 cm dan mendapat jahitan 8 jahitan. ini udaah waktunya saya kontrol untuk cabut jahitan luka saya ini pas di cabut jahitannya kok malah keluar gumpalan darah. Saya takut dok, ini kenapa dengan luka saya dok?',
  },
  {
    title: 'Penyebab perut bunyi saat sedang hamil trimester 1',
    description:
      'Halo dok, saya perempuan 27 tahun. Saat ini sedang hamil 2 bulan ini kehamilan perama saya dok. Saya mau tanya dok, kenapa ya, sudah 2 hari ini perut saya sering bunyi. padahal saya udah makan atau sedang tidak lapar dok. Apakah perut bunyi pada ibu hamil itu normal dok? bisa tolong jelaskan penyebabnya apa dan apa yg harus saya lakukan untuk mengatasinya dok? terima kasih',
  },
  {
    title: 'Penyebab nyeri perut kiri bawah saat hamil 4 bulan',
    description:
      'Ijin ganggu dok, saya mau nanya. saya bumil 4 bulan. jadi gini dok perut kiri bawah saya suka nyeri. ini kejadian udah semenjak seminggu lalu sampe sekarang nih dokter. nyerinya itu kadang berlangsung seharian dan hilang timbul. Apakah ini kelainan apa normal dialami bumil usia 4 bulan dok? bagaimana cara mengatasi sakit perut sebelah kiri bawah saat hamil ya?',
  },
  {
    title: 'Rekomendasi minuman pereda sakit kepala hingga mual',
    description:
      'Selamat siang , dok saya wanita pekerja kantoran, saya sering kali sakit kepala di pelipis / migrain hingga tengkuk bagian kanan jg terasa gak nyaman dokter. terkadang sakitnya itu bisa menimbulkan saya mual-mual dok. mau nanya minuman pereda sakit kepala untuk sakit saya ini dong dokter. makasih',
  },
  {
    title:
      'Positif hamil setelah mengalami keguguran 2 kali, bagaimana agar janin tetap sehat?',
    description:
      'Jadi gini dok, saya udah nikah 3 tahun, selama itu saya udah keguguran 2x. Sekarang saya telat haid pas di testpack hasilnya positif. Saya pas keguguran dulu itu di usia kehamilan 7 minggu dan 8 minggu. Saya khawatir ini akan kejadian yg kaya dulu lagi. Minta saran dong dokter. Agar kehamilan saya ini baik-baik saja dan tetep sehat sampe bayi lahir. terima kasih',
  },
  {
    title: 'Apa penyebab vagina gatal dan keputihan berwarna kuning?',
    description:
      'Maaf dok, sebelumnya ini agak jorok. saya wanita 27 th, belum menikah. Dalam seminggu ini vagina saya keputihan, keputihannya kuning, baunya gada, cuma di dalam vagina saya rasanya gatal sekali. Saya pake rebusan daun sirih enakan pas di pake cebok pertama kali aja. keputihan dan gatalnya masih gak enak ini dok. Apa penyebabnya dok? san obat yang ampuh untuk saya ini obat apa?',
  },
  {
    title:
      'Bagaimanakah cara menghilangkan varises dengan menggunakan es batu?',
    description:
      'Selamat siang dok, saya seorang atlit dok, saya punya varises di kaki saya bagian belakang dok. Kata orang bisa ilangin varises pake batu es.. Apakah benar ya dok dengan mengkompres kaki dengan batu es dapat menghilangkan sakit varises? kalau memang iya, apakah baik jikalau selama habis lari langsung dikompres pakai batu es. dan satu lagi dok, tolong penjelasan dimana tepatnya yg harus dikompres pada bagian kaki? Terimakasi banyak dok atas jawabannya',
  },
  {
    title:
      'Adakah cara lain selain konsumsi antibiotik untuk mengatasi radang panggul?',
    description:
      'Selamat Pagi Dok, Istri Saya sudah cek ke RS dan katanya dia kenak Radang Panggul.. Dari dokter dikasihkan obat antibiotik untuk 2 minggu.. pertanyaan saya dok, Apakah ada solusi Lain selain meminum Obat AntiBiotik yang diberikan oleh rumah sakit? selain untuk mencegah Hal yang tidak saya inginkan untuk Istri saya,.karena hampir tiap hari Istri Saya merasa sakit di sekitaran Panggul nya Dok,.Mohon di jawab & di respon ya Dok',
  },
];

async function main() {
  const saltRounds = 10;

  const testUser = await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'member@gmail.com',
      name: 'Mayalinda',
      password: await hash('member', saltRounds),
      username: 'Maya',
      profilePicture: '/profile.webp',
      isActive: true,
      role: 'Member',
    },
  });
  const testUser1 = await prisma.user.upsert({
    where: { email: 'doctor@gmail.com' },
    update: {},
    create: {
      email: 'doctor@gmail.com',
      name: 'Doctor',
      password: await hash('doctor', saltRounds),
      username: 'Doctor',
      profilePicture: '/profile.webp',
      isActive: true,
      role: 'Doctor',
    },
  });
  const testUser2 = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: await hash('admin', saltRounds),
      username: 'Admin',
      profilePicture: '/profile.webp',
      isActive: true,
      role: 'Admin',
    },
  });
  EXAMPLE_TEXT.map(async (text) => {
    const forum = await createForum({
      id: uuidv4(),
      title: text.title,
      description: text.description,
      userId: testUser.id,
      seen: 0,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  });

  // !Debugging Purpose
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
