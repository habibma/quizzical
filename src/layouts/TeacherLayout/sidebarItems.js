import DashboardIcon from "../../assets/icons/DashboardIcon";
import RepoIcon from "../../assets/icons/RepoIcon";
import QuizzesIcon from "../../assets/icons/QuizzesIcon";
import QuestionsIcon from "../../assets/icons/QuestionsIcon";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/teacher",
    icon: DashboardIcon,
  },
  {
    title: "Repositories",
    path: "/teacher/repositories",
    icon: RepoIcon,
  },
  {
    title: "Question Bank",
    path: "/teacher/question-bank",
    icon: QuestionsIcon,
  },
  {
    title: "My Questions",
    path: "/teacher/my-questions",
    icon: QuestionsIcon,
  },
  {
    title: "Quizzes",
    path: "/teacher/quizzes",
    icon: QuizzesIcon,
  }
];
