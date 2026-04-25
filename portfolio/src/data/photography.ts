export type PhotoWork = {
  title: string;
  image: string;
  href: string;
};

const imageParams = '?auto=format&fit=crop&w=900&q=72';

export const PHOTO_WORKS: PhotoWork[] = [
  {
    title: 'Rocks in a calm lake with city skyline at sunset',
    image: `https://images.unsplash.com/photo-1771908294768-30c672a71ae0${imageParams}`,
    href: 'https://unsplash.com/photos/rocks-in-a-calm-lake-with-city-skyline-at-sunset-NTxRAc15iws',
  },
  {
    title: 'Tokyo cityscape at night with Tokyo Tower illuminated',
    image: `https://images.unsplash.com/photo-1767719901332-74f958cc061f${imageParams}`,
    href: 'https://unsplash.com/photos/tokyo-cityscape-at-night-with-tokyo-tower-illuminated-HS-FEgUu-6U',
  },
  {
    title: 'Moonlit cityscape with tall buildings under a dark blue sky',
    image: `https://images.unsplash.com/photo-1767481906292-7b452a5401ce${imageParams}`,
    href: 'https://unsplash.com/photos/moonlit-cityscape-with-tall-buildings-under-a-dark-blue-sky-TUIXgQIzJb4',
  },
  {
    title: 'People with umbrellas ascend stairs at night',
    image: `https://images.unsplash.com/photo-1767368028507-42fece08eb44${imageParams}`,
    href: 'https://unsplash.com/photos/people-with-umbrellas-ascend-stairs-at-night-U1EDM37MrFc',
  },
  {
    title: 'People inside a train during snowfall',
    image: `https://images.unsplash.com/photo-1767368028456-275b67d1d851${imageParams}`,
    href: 'https://unsplash.com/photos/people-inside-a-train-during-snowfall-J8xZ5netC3s',
  },
  {
    title: 'Busy city street crossing at night with blurred motion',
    image: `https://images.unsplash.com/photo-1767368028452-7f4e94179110${imageParams}`,
    href: 'https://unsplash.com/photos/busy-city-street-crossing-at-night-with-blurred-motion-aiOer8G2Pqo',
  },
  {
    title: 'Tokyo Tower illuminated at night with city lights',
    image: `https://images.unsplash.com/photo-1767712213885-595109b3aa16${imageParams}`,
    href: 'https://unsplash.com/photos/tokyo-tower-illuminated-at-night-with-city-lights-KOu_uzFtblo',
  },
  {
    title: 'Mount Fuji reflected in calm water at sunrise',
    image: `https://images.unsplash.com/photo-1767286694091-2bffe3e8b489${imageParams}`,
    href: 'https://unsplash.com/photos/mount-fuji-reflected-in-calm-water-at-sunrise-WJAl9CtgdyA',
  },
  {
    title: 'Person looking at illuminated Tokyo Tower at night',
    image: `https://images.unsplash.com/photo-1767286694091-28ce618236da${imageParams}`,
    href: 'https://unsplash.com/photos/person-looking-at-illuminated-tokyo-tower-at-night-T1PZEkKuXQ8',
  },
  {
    title: 'Vibrant cityscape illuminated at night with glowing lights',
    image: `https://images.unsplash.com/photo-1767286694319-503ce83f986d${imageParams}`,
    href: 'https://unsplash.com/photos/vibrant-cityscape-illuminated-at-night-with-glowing-lights-P7ZipaxM8LA',
  },
];
