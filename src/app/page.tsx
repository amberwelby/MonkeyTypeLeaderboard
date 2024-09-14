import Image from "next/image";
import styles from "./page.module.css";
import LeaderBoard from "@/components/LeaderBoard";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="bg-red-900">
      <LeaderBoard />
    </div>
  );
}
