import DashboardIcon from "../../assets/icons/DashboardIcon";
import RepoIcon from "../../assets/icons/RepoIcon";
import CategoriesIcon from "../../assets/icons/CategoriesIcon";
import QuestionsIcon from "../../assets/icons/QuestionsIcon";
import QuizzesIcon from "../../assets/icons/QuizzesIcon";
import StatisticsIcon from "../../assets/icons/StatisticsIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import ThemesIcon from "../../assets/icons/ThemesIcon";
import ApiIcon from "../../assets/icons/ApiIcon";
import AwardIcon from "../../assets/icons/AwardIcon";

export const sidebarItems = [
  {
    section: "Overview",
    title: "Dashboard",
    path: "/admin",
    icon: DashboardIcon,
  },
  {
    section: "Content",
    title: "Categories",
    path: "/admin/categories",
    icon: CategoriesIcon,
  },
  {
    section: "Content",
    title: "Question Sources",
    path: "/admin/question-sources",
    icon: QuestionsIcon,
  },
  {
    section: "Content",
    title: "Rewards",
    path: "/admin/rewards",
    icon: AwardIcon,
  },
  {
    section: "Overview",
    title: "Statistics",
    path: "/admin/statistics",
    icon: StatisticsIcon,
  },
  {
    section: "System",
    title: "Settings",
    path: "/admin/settings",
    icon: SettingsIcon,
  },
  {
    section: "System",
    title: "Themes",
    path: "/admin/themes",
    icon: ThemesIcon,
  },
  {
    section: "System",
    title: "API Management",
    path: "/admin/api",
    icon: ApiIcon,
  },
];
