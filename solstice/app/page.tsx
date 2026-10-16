import { HomeA } from "@/components/home/HomeA";
import { heroSet } from "@/lib/photos";

export default function Home() {
  return <HomeA photos={heroSet()} />;
}
