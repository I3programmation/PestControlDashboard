import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Subscriptions from "../ui/dashboard/subscriptions/subscriptions";

const DashboardPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card title="Total Users" number="10.273" detail="more than previous week" />
          <Card title="Total Exterminators" number="6.273" detail="more than previous week" />
          <Card title="Total Reviews" number="5000" detail="more than previous week" />

        </div>
        <Subscriptions />
        <Chart />
      </div>

      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default DashboardPage;
