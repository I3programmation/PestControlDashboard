"use client";

import {getDataStats } from "@/app/firebase/actions";
import Card from "../ui/dashboard/card/card";
import DashboardChart from "../ui/dashboard/charts/dashboardChart/dashboardChart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Subscriptions from "../ui/dashboard/subscriptions/subscriptions";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const stats = await getDataStats();
      setStats(stats);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {stats.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Subscriptions />
        <DashboardChart />
      </div>

      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default DashboardPage;
