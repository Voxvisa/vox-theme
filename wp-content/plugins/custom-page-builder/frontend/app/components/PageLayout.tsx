// frontend/app/components/PageLayout.tsx
import React from "react";

type PageLayoutProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ title, icon, children }) => {
  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold">
        {icon} {title}
      </h1>
      <div>{children}</div>
    </main>
  );
};

export default PageLayout;
