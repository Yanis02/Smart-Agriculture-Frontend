const routesAuthorization: Record<string, string[]> = {
    farmer: [
      "/admin",
      "/admin/cows/:cowId",
      "/admin/myfarm",
      "/admin/alerts",
    ],
   
  };
  
  export default routesAuthorization;