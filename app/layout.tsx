import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Bier Belly Bites | Big Flavours. Happy Bellies.',
  description: 'Discover bold, satisfying bites at Bier Belly Bites. Explore our menu and order your favourites.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
