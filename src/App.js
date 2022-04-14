import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import AddStudent from './views/pages/AddStudent'
// import "./App.css";
import Login from "./views/components/Login";
import Register from "./views/components/Register";
import Dashboard from "./views/pages/Dashboard";
import ViewStudent from "./views/pages/ViewStudent";
import EditStudent from "./views/components/EditStudent";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/addstudent" element={<AddStudent/>}/>
            <Route path="/dashboard/viewstudent" element={<ViewStudent/>}/>
            <Route path="/dashboard/edit/:id" element={<EditStudent/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
