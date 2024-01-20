"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { cardsUsersStats, getUsersByUserType } from "@/app/firebase/actions";

import Card from "@/app/ui/dashboard/card/card";
import AgeDistributionChart from "@/app/ui/dashboard/charts/ageChart/agechart";
// import MapViewChart from "@/app/ui/dashboard/charts/mapViewChart/mapViewChart";
import ProvinceSubscriptionsChart from "@/app/ui/dashboard/charts/provinceSubscriptionsChart/provinceSubscriptionsChart";

import styles from "@/app/ui/dashboard/users-stats/users-stats.module.css";

const DynamicMap = dynamic(
  () => import("../../ui/dashboard/charts/mapViewChart/dynamicMap"),
  {
    ssr: false,
  }
);

const UsersStatisticsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getUsersByUserType("user");
      setData(result);
      // console.log(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {cardsUsersStats.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <div className={styles.demographics}>
        <div className={styles.main}>
          <AgeDistributionChart />
        </div>
        <div className={styles.side}>
          {/* <ProvinceSubscriptionsChart /> */}
          {!isLoading && <DynamicMap data={data} />}
        </div>
      </div>
    </div>
  );
};

export default UsersStatisticsPage;
