import DashboardIcon from "../../assets/icons/DashboardIcon";
import RepoIcon from "../../assets/icons/RepoIcon";
import CategoriesIcon from "../../assets/icons/CategoriesIcon";
import QuestionsIcon from "../../assets/icons/QuestionsIcon";
import QuizzesIcon from "../../assets/icons/QuizzesIcon";
import StatisticsIcon from "../../assets/icons/StatisticsIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import ThemesIcon from "../../assets/icons/ThemesIcon";
import ApiIcon from "../../assets/icons/ApiIcon";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: DashboardIcon,
  },
  {
    title: "Repositories",
    path: "/admin/repositories",
    icon: RepoIcon,
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: CategoriesIcon,
  },
  {
    title: "Questions",
    path: "/admin/questions",
    icon: QuestionsIcon,
  },
  {
    title: "Quizzes",
    path: "/admin/quizzes",
    icon: QuizzesIcon,
  },
  {
    title: "Statistics",
    path: "/admin/statistics",
    icon: StatisticsIcon,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: SettingsIcon,
  },
  {
    title: "Themes",
    path: "/admin/themes",
    icon: ThemesIcon,
  },
  {
    title: "API Management",
    path: "/admin/api",
    icon: ApiIcon,
  },
];
