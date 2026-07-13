import DashboardIcon from "../../assets/icons/DashboardIcon"
import QuestionsIcon from "../../assets/icons/QuestionsIcon"
import QuizzesIcon from "../../assets/icons/QuizzesIcon"
import CategoriesIcon from "../../assets/icons/categoriesIcon"
import SettingsIcon from "../../assets/icons/SettingsIcon"
import StatisticsIcon from "../../assets/icons/StatisticsIcon"
import ThemesIcon from "../../assets/icons/ThemesIcon"
import ApiIcon from "../../assets/icons/ApiIcon"

export const sidebarItems = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: DashboardIcon,
  },
  {
    title: 'Questions',
    path: '/admin/questions',
    icon: QuestionsIcon,
  },
  {
    title: 'Quizzes',
    path: '/admin/quizzes',
    icon: QuizzesIcon,
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: CategoriesIcon,
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: SettingsIcon,
  },
  {
    title: 'Statistics',
    path: '/admin/statistics',
    icon: StatisticsIcon,
  },
  {
    title: 'Themes',
    path: '/admin/themes',
    icon: ThemesIcon,
  },
  {
    title: 'API',
    path: '/admin/api',
    icon: ApiIcon,
  }
]
