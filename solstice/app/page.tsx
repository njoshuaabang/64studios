import { HomeA } from "@/components/home/HomeA";
import { HomeB } from "@/components/home/HomeB";
import { heroSet, photo } from "@/lib/photos";
import { variant } from "@/lib/variant";

export default function Home() {
  return variant === "b" ? (
    <HomeB photos={heroSet()} newbury={{ rear: photo("newbury-rear"), frame: photo("newbury-frame") }} />
  ) : (
    <HomeA photos={heroSet()} />
  );
}
