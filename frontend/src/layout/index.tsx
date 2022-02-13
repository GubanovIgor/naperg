import { Layout } from "antd";
import React, { ReactNode, useContext } from "react";

import { Store } from "../store";
import { Content } from "./Content";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export const LayoutComponent = ({ children }: LayoutProps) => {
  const {
    state: { userAuthorized },
  } = useContext(Store);

  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
};

export { LayoutComponent as Layout };
