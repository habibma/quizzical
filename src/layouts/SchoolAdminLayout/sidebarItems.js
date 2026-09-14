import DashboardIcon from "../../assets/icons/DashboardIcon";
import TeacherIcon from "../../assets/icons/TeacherIcon";
import StudentIcon from "../../assets/icons/StudentIcon";
import ClassroomIcon from "../../assets/icons/ClassroomIcon";
import CertificateIcon from "../../assets/icons/CertificateIcon";
import ReportsIcon from "../../assets/icons/ReportsIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import ParentsIcon from "../../assets/icons/ParentIcon";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/principal",
    icon: DashboardIcon,
  },
  {
    title: "Teachers",
    path: "/principal/teachers",
    icon: TeacherIcon,
  },
  {
    title: "Students",
    path: "/principal/students",
    icon: StudentIcon,
  },
  {
    title: "Classes",
    path: "/principal/classes",
    icon: ClassroomIcon,
  },
  {
    title: "Courses",
    path: "/principal/courses",
    icon: CertificateIcon,
  },
  {
    title: "Reports",
    path: "/principal/reports",
    icon: ReportsIcon,
  },
  {
    title: "Parents",
    path: "/principal/parents",
    icon: ParentsIcon,
  },
  {
    title: "Settings",
    path: "/principal/settings",
    icon: SettingsIcon,
  }
];
