import React from "react";
const Events = React.lazy(() => import("../Components/Events/Events"));
const Profile = React.lazy(() => import("../Components/Profile/Profile"));
const Register = React.lazy(() => import("../Components/Register/Register"));
const Login = React.lazy(() => import("../Components/Login/Login"));
const Home = React.lazy(() => import("../Components/Home/Home"));
const Dashboard = React.lazy(() => import("../Components/Dashboard/Dashboard"));
const NotFound = React.lazy(() => import("../Components/404_NotFound/NotFound"));
const AddEvents = React.lazy(() => import("../Components/AddEvents/AddEvents"));

const components = {
  Home :{
    path: "/",
    name: "home",
    element: <Home />,
  },
  AddEvents:{
    path:"/addevents",
    name:"addevents",
    element:<AddEvents/>
  },
  Profile: {
    path: "/profile",
    name: "profile",
    element: <Profile />,
  },
  Dashboard: {
    path:'/dashboard',
    name:'dashboard',
    element:<Dashboard/>
  },
  Register: {
    path: "/register",
    name: "register",
    element: <Register />,
  },
  Login: {
    path: "/login",
    name: "login",
    element: <Login />,
  },
  NotFound: {
    path: "*",
    name: "Not Found",
    element: <NotFound />,
  },
};

const rolesConfig = {
  user: {
    routes: [components.AddEvents, components.Profile],
  },
};

const BasicRoutesConfig = [
  components.Register,
  components.Login,
  components.Profile,
  components.NotFound,
  components.Home,
  components.Dashboard,
  components.AddEvents
];

export { rolesConfig, BasicRoutesConfig };
