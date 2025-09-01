import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Allapp from "./Allapp";
import Auth from "./pages/authentication/Auth";
import DomainSelect from "./pages/DomainSelect/DomainSelect";
import Interview from "./pages/Interview/Interview";
import Resumeupload from "./pages/Interview/Resumeupload";
import ProtectedRoute from "./routes/ProtectedRoute";
import DsaMain from "./pages/DSAplanner/DSAform/DSAPlannerForm";
import Dashboard from "./pages/DashBoard/Dashboard";
import QuizzFormPage from "./pages/Quizz/QuizzForm/QuizzFormPage";
import QuizzPage from "./pages/Quizz/Quizzpage/QuizzPage";

const router = createBrowserRouter([
  { path: "/", element: <Allapp /> },
  { path: "/auth", element: <Auth /> },
  {
    path: "/domainselected",
    element: (
      <ProtectedRoute>
        <DomainSelect />
      </ProtectedRoute>
    ),
  },
  {
    path: "domainselected/resumeupload",
    element: (
      <ProtectedRoute>
        <Resumeupload />
      </ProtectedRoute>
    ),
  },
  {
    path: "domainselected/resumeupload/interview/:id",
    element: (
      <ProtectedRoute>
        <Interview />
      </ProtectedRoute>
    ),
  },
  {
    path: "domainselected/dsaform",
    element: (
      <ProtectedRoute>
        <DsaMain />
      </ProtectedRoute>
    ),
  },
  {
    path: "domainselected/dashboard/:id",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "domainselected/quizzform",
    element: (
      <ProtectedRoute>
        <QuizzFormPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "domainselected/quizzform/quizzpage",
    element: (
      <ProtectedRoute>
       <QuizzPage/>
      </ProtectedRoute>
    ),
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
