import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => (
  <div className="min-h-full">
    <Navbar />
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="grow min-h-full">{children}</div>
    </div>
    <Footer />
  </div>
);

export default BaseLayout;
