import React, { useContext } from "react";

import { Store } from "../store";

const HeaderComponent = () => {
  const {
    state: { userAuthorized },
  } = useContext(Store);

  return "тоамоалм";
};

export { HeaderComponent as Header };
