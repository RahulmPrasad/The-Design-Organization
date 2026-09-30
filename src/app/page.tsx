import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTechnology } from "@/components/home/HomeTechnology";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeTechnology />
    </>
  );
}
