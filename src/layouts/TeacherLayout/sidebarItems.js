import DashboardIcon from "../../assets/icons/DashboardIcon";
import RepoIcon from "../../assets/icons/RepoIcon";
import QuizzesIcon from "../../assets/icons/QuizzesIcon";
import QuestionsIcon from "../../assets/icons/QuestionsIcon";

export const sidebarItems = [
  {
    section: "Overview",
    title: "Dashboard",
    path: "/teacher",
    icon: DashboardIcon,
  },
  {
    section: "Content",
    title: "Repositories",
    path: "/teacher/repositories",
    icon: RepoIcon,
  },
  {
    section: "Content",
    title: "Question Bank",
    path: "/teacher/question-bank",
    icon: QuestionsIcon,
  },
  {
    section: "Content",
    title: "My Questions",
    path: "/teacher/my-questions",
    icon: QuestionsIcon,
  },
  {
    section: "Teaching",
    title: "Quizzes",
    path: "/teacher/quizzes",
    icon: QuizzesIcon,
  }
];
