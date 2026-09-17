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
    section: "Overview",
    title: "Dashboard",
    path: "/principal",
    icon: DashboardIcon,
  },
  {
    section: "People",
    title: "Teachers",
    path: "/principal/teachers",
    icon: TeacherIcon,
  },
  {
    section: "People",
    title: "Students",
    path: "/principal/students",
    icon: StudentIcon,
  },
  {
    section: "Academic",
    title: "Classes",
    path: "/principal/classes",
    icon: ClassroomIcon,
  },
  {
    section: "Academic",
    title: "Courses",
    path: "/principal/courses",
    icon: CertificateIcon,
  },
  {
    section: "Overview",
    title: "Reports",
    path: "/principal/reports",
    icon: ReportsIcon,
  },
  {
    section: "People",
    title: "Parents",
    path: "/principal/parents",
    icon: ParentsIcon,
  },
  {
    section: "System",
    title: "Settings",
    path: "/principal/settings",
    icon: SettingsIcon,
  }
];
