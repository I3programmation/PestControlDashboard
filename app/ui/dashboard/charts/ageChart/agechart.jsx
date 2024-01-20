"use client";

// AgeDistributionChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import { ageDistributionData } from "@/app/firebase/actions";
import styles from "./agechart.module.css";


const AgeDistributionChart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Age Distribution</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={700}
          height={300}
          data={ageDistributionData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="male"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            barSize={25}
          />
          <Bar
            dataKey="female"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
            barSize={25}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeDistributionChart;
