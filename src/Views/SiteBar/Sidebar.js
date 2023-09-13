import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import UpdateIcon from '@mui/icons-material/Update';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MailIcon from '@mui/icons-material/Mail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/profileimage.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Urmila Sirase
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                 Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Testimonials"
              to="/testimonial"
              icon={<HowToRegIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Updates"
              to="/update"
              icon={<UpdateIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Staff"
              to="/staff"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Achivements"
              to="/achivements"
              icon={<EmojiEventsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Activity"
              to="/activities"
              icon={<WorkIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Academic Calendar"
              to="/academicCalender"
              icon={<CalendarTodayIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Publication"
              to="/publication"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Committee"
              to="/committee"
              icon={<SupervisedUserCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="News"
              to="/news"
              icon={<AnnouncementIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Library"
              to="/library"
              icon={<LibraryBooksIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Placement"
              to="/placement"
              icon={<AttachMoneyIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Result & Letter"
              to="/resultnletter"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Email"
              to="/email"
              icon={<MailIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Error"
              to="/404"
              icon={<ErrorOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Login"
              to="/login"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Registration"
              to="/register"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
