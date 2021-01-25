type Route = {
    name: string;
    path: string;
  };
  
  const routes: Route[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Launches",
      path: "/launches",
    },
    {
      name: "Rockets",
      path: "/rockets",
    },
    {
      name: "About",
      path: "/about",
    },
  ];
  
  export default routes;
  