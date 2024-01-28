"use client";

import { useEffect, useState } from "react";
// Mandatory for DynamicMap to work
import Head from "next/head";
import dynamic from "next/dynamic";
import { getDataStats, getUsersByUserType } from "@/app/firebase/actions";

import Card from "@/app/ui/dashboard/card/card";
import AgeDistributionChart from "@/app/ui/dashboard/charts/ageChart/agechart";
// import MapViewChart from "@/app/ui/dashboard/charts/mapViewChart/mapViewChart";
import ProvinceSubscriptionsChart from "@/app/ui/dashboard/charts/provinceSubscriptionsChart/provinceSubscriptionsChart";

import styles from "@/app/ui/dashboard/exterminators-stats/exterminators-stats.module.css";

const DynamicMap = dynamic(
  () => import("../../ui/dashboard/charts/mapViewChart/dynamicMap"),
  {
    ssr: false,
  }
);

const ExterminatorsStatisticsPage = () => {
  const [data, setData] = useState([]);
  const [exterStats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultLoc, setDefaultLoc] = useState([45.508888, -73.561668]);

  const getLocation = () => {
    setDefaultLoc([45.508888, -73.561668]);
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log(position);
    //       setDefaultLoc([position.coords.latitude, position.coords.longitude]);
    //     },
    //     (error) => {
    //       alert(error);
    //       setDefaultLoc([45.508888, -73.561668]);
    //     }
    //   );
    // }
  };

  useEffect(() => {
    getLocation();
    const fetchData = async () => {
      setIsLoading(true);
      const stats = await getDataStats("exterminator");
      setStats(stats);
      const result = await getUsersByUserType("exterminator");
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {exterStats.map((item, idx) => (
          <Card item={item} key={idx} />
        ))}
      </div>
      <div className={styles.demographics}>
        <div className={styles.main}>
          <ProvinceSubscriptionsChart />
          {/* <AgeDistributionChart /> */}
        </div>
        <div className={styles.side}>
          <DynamicMap data={data} loc={defaultLoc}/>
        </div>
      </div>
    </div>
  );
};

export default ExterminatorsStatisticsPage