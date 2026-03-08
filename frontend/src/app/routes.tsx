import { createBrowserRouter } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";

import { AdminLayout } from "./layouts/AdminLayout";
import { StudentLayout } from "./layouts/StudentLayout";

import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminStudents } from "./pages/admin/Students";
import { AdminWorkouts } from "./pages/admin/Workouts";
import { AdminClasses } from "./pages/admin/Classes";
import { AdminAssessments } from "./pages/admin/Assessments";
import { AdminFinancial } from "./pages/admin/Financial";
import { AdminAnnouncements } from "./pages/admin/Announcements";
import { StudentPerformance } from "./pages/admin/StudentPerformance";
import { WorkoutBuilder } from "./pages/admin/WorkoutBuilder";

import { StudentDashboard } from "./pages/student/Dashboard";
import { StudentWorkouts } from "./pages/student/Workouts";
import { StudentClasses } from "./pages/student/Classes";
import { StudentAssessments } from "./pages/student/Assessments";
import { StudentPayments } from "./pages/student/Payments";

import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([

  {
    path: "/",
    Component: Login,
  },

  {
    path: "/register",
    Component: Register,
  },

  {
    path: "/forgot-password",
    Component: ForgotPassword
  },

  // ADMIN
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout/>
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "students", Component: AdminStudents },
      { path: "students/performance", Component: StudentPerformance },
      { path: "workouts", Component: AdminWorkouts },
      { path: "workouts/builder", Component: WorkoutBuilder },
      { path: "classes", Component: AdminClasses },
      { path: "assessments", Component: AdminAssessments },
      { path: "financial", Component: AdminFinancial },
      { path: "announcements", Component: AdminAnnouncements },
    ],
  },

  // STUDENT
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <StudentLayout/>
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: StudentDashboard },
      { path: "workouts", Component: StudentWorkouts },
      { path: "classes", Component: StudentClasses },
      { path: "assessments", Component: StudentAssessments },
      { path: "payments", Component: StudentPayments },
    ],
  },

]);