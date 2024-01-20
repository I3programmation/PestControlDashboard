"use client";

// ProvinceSubscriptionsChart.js
import React from "react";
import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  CartesianGrid,
} from "recharts";
import styles from "./provinceSubscriptionsChart.module.css";

const data = [
  { province: "AB", users: 400 },
  { province: "BC", users: 300 },
  { province: "MB", users: 250 },
  { province: "NB", users: 200 },
  { province: "NL", users: 150 },
  { province: "NS", users: 250 },
  { province: "ON", users: 300 },
  { province: "PE", users: 50 },
  { province: "QC", users: 300 },
  { province: "SK", users: 200 },
  { province: "NT", users: 100 },
  { province: "NU", users: 50 },
  { province: "YT", users: 75 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF194E",
  "#FFCA28",
  "#82ca9d",
  "#8884d8",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

const ProvinceSubscriptionsChart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Geographical Distribution</h2>
      <ResponsiveContainer width="100%" height={340}>
        {/* <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" label />
        </PieChart> */}
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="province" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" barSize={25} fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProvinceSubscriptionsChart;

// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import styles from "./province-map-chart.module.css";

// const data = [
//   { province: "Alberta", value: 400 },
//   { province: "British Columbia", value: 300 },
//   { province: "Manitoba", value: 300 },
//   { province: "New Brunswick", value: 200 },
//   { province: "Newfoundland and Labrador", value: 150 },
//   { province: "Nova Scotia", value: 250 },
//   { province: "Ontario", value: 600 },
//   { province: "Prince Edward Island", value: 50 },
//   { province: "Quebec", value: 500 },
//   { province: "Saskatchewan", value: 200 },
//   { province: "Northwest Territories", value: 100 },
//   { province: "Nunavut", value: 50 },
//   { province: "Yukon", value: 75 },
// ];

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#AF19FF",
//   "#FF194E",
//   "#FFCA28",
//   "#82ca9d",
//   "#8884d8",
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
// ];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="black"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${data[index].province} ${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const ProvinceSubscriptionsChart = () => {
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Province Subscriptions</h2>
//       <ResponsiveContainer width="100%" height={500}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={renderCustomizedLabel}
//             outerRadius={150}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip
//             formatter={(value) => [`${value}%`, `${value} subscriptions`]}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ProvinceSubscriptionsChart;
