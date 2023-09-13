import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Views/SiteBar/Topbar";
import TestimonialsList from "./Views/Testimonials";
import AchivementListView  from "./Views/achivements/AchivementListView";
import Sidebar from "./Views/SiteBar/Sidebar";
import Dashboard from "./Views/dashboard/DashboardView";
import LoginView from './Views/auth/LoginView';
import RegisterView from './Views/auth/RegisterView';
import Team from "./Components-Example/team";
import Invoices from "./Components-Example/invoices";
import Contacts from "./Components-Example/contacts";
import Bar from "./Components-Example/bar";
import Form from "./Components-Example/form";
import Line from "./Components-Example/line";
import Pie from "./Components-Example/pie";
import FAQ from "./Components-Example/faq";
import Geography from "./Components-Example/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import UpdateListView from './Views/updates/UpdateListView';
import StaffList from './Views/staff/StaffListView';
import ActivitiesListView from './Views/activities/ActivitiesListView';
import CalendarList from './Views/calendar/CalendarListView';
import PublicationsList from './Views/publications';
import NewsList from './Views/News';
import Committee from './Views/committee';
import Library from './Views/Library';
import Placement from './Views/Placement';
import ResultnLetter from './Views/ResultnLetter';
import Email from './Views/email';
import NotFoundView from './Views/errors/NotFoundView';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />

              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />

              <Route path="/testimonial" element={<TestimonialsList />} />
              <Route path="/update" element={<UpdateListView />} />
              <Route path="/staff" element={<StaffList />} />
              <Route path="/activities" element={<ActivitiesListView />} />
              <Route path="/academicCalender" element={<CalendarList />} />
              <Route path="/publication" element={<PublicationsList />} />
              <Route path="/committee" element={<Committee />} />
              <Route path="/news" element={<NewsList />} />
              <Route path="/library" element={<Library />} />
              <Route path="/placement" element={<Placement />} />
              <Route path="/resultnletter" element={<ResultnLetter />} />
              <Route path="/email" element={<Email />} />
              <Route path="/404" element={<NotFoundView />} />

              <Route path="/achivements" element={<AchivementListView />} />
              <Route path="/contact" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
            
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
