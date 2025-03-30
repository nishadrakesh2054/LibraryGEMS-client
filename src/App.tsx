import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Books from "./pages/Book/Books";
import Students from "./pages/Student/Students";
import Circulation from "./pages/circulation/Circulation";
import Reports from "./pages/Analytics/Reports";
import AddStudent from "./pages/Student/AddStudent";
import EditStudent from "./pages/Student/EditStudent";
import ViewStudent from "./pages/Student/ViewStudent";
import AddBook from "./pages/Book/AddBook";
import EditBook from "./pages/Book/EditBook";
import ViewBook from "./pages/Book/ViewBook";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            <Route path="/books" element={<Books />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/editbook/:id" element={<EditBook />} />
            <Route path="/viewbook/:id" element={<ViewBook />} />

            {/* Students  Page start */}
            <Route path="/students" element={<Students />} />
            <Route path="/addstudent" element={<AddStudent />} />
            <Route path="/editstudent/:id" element={<EditStudent />} />
            <Route path="/viewstudent/:id" element={<ViewStudent />} />
            {/* Students  Page  end */}

            <Route path="/circulations" element={<Circulation />} />
            <Route path="/reports" element={<Reports />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
