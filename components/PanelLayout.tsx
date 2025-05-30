import React from "react";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col px-6">{children}</div>;
};

export default PanelLayout;
