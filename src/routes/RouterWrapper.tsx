// RouterWrapper.tsx
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteConfig } from "@routes/index";
import Loading from "@components/Loading";

interface RouterWrapperProps {
  routes: RouteConfig[];
}

function renderRoutes(routes: RouteConfig[]) {
  return routes.map((route, i) => (
    <Route key={i} path={route.path} element={<route.component />} />
  ));
}

const RouterWrapper: React.FC<RouterWrapperProps> = ({ routes }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRouteChangeStart = () => {
    setIsLoading(true);
  };

  const handleRouteChangeEnd = () => {
    setIsLoading(false);
  };

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;
