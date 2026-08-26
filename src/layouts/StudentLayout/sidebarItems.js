import DashboardIcon from "../../assets/icons/DashboardIcon";
import StatisticsIcon from "../../assets/icons/StatisticsIcon";
import QuizzesIcon from "../../assets/icons/QuizzesIcon";
import RankIcon from "../../assets/icons/RankIcon";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/teacher",
    icon: DashboardIcon,
  },
  {
    title: "My Quizzes",
    path: "/student/quizzes",
    icon: QuizzesIcon,
  },
  {
    title: "Insights",
    path: "/student/insights",
    icon: StatisticsIcon,
  },
  {
    title: "Leaderboard",
    path: "/student/leaderboard",
    icon: RankIcon,
  }
];
