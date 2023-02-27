import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Layout from "../../components/Layout";
import { LoaderComponent } from "../../components/LoaderComponent";
import Header from "./Header";
import Sidebar from "./Sidebar";

function DashboardPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigation = useNavigation();
  // console.log(isDrawerOpen);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return navigation.state === "loading" ? (
    <div className="w-full h-screen flex items-center justify-center">
      <Layout />
    </div>
  ) : (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Side drawer */}
      <Sidebar isOpen={isDrawerOpen} handleToggle={handleToggleDrawer} />
      {/* Main content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        {/* Header */}
        <div className="relative">
          <Header isOpen={isDrawerOpen} handleToggle={handleToggleDrawer} />

          {/* Main content */}
          <Outlet context={[isDrawerOpen, setIsDrawerOpen]} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
