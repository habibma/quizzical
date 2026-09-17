import DashboardIcon from "../../assets/icons/DashboardIcon";
import StatisticsIcon from "../../assets/icons/StatisticsIcon";
import QuizzesIcon from "../../assets/icons/QuizzesIcon";
import RankIcon from "../../assets/icons/RankIcon";

export const sidebarItems = [
  {
    section: "Overview",
    title: "Dashboard",
    path: "/student",
    icon: DashboardIcon,
  },
  {
    section: "Learning",
    title: "My Quizzes",
    path: "/student/quizzes",
    icon: QuizzesIcon,
  },
  {
    section: "Learning",
    title: "Insights",
    path: "/student/insights",
    icon: StatisticsIcon,
  },
  {
    section: "Learning",
    title: "Leaderboard",
    path: "/student/leaderboard",
    icon: RankIcon,
  }
];
