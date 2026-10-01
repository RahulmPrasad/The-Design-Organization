import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTeam } from "@/components/home/HomeTeam";
import { HomeTechnology } from "@/components/home/HomeTechnology";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeTechnology />
      <HomeTeam />
    </>
  );
}
