import React from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";

interface TabsProps {
  justifyActive: string;
  handleJustifyClick: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ justifyActive, handleJustifyClick }) => {
  return (
    <MDBTabs
      pills
      justify
      className="mb-2 d-flex flex-row justify-content-between"
    >
      <MDBTabsItem>
        <MDBTabsLink
          onClick={() => handleJustifyClick("tab1")}
          active={justifyActive === "tab1"}
        >
          Login
        </MDBTabsLink>
      </MDBTabsItem>
      <MDBTabsItem>
        <MDBTabsLink
          onClick={() => handleJustifyClick("tab2")}
          active={justifyActive === "tab2"}
        >
          Register
        </MDBTabsLink>
      </MDBTabsItem>
    </MDBTabs>
  );
};

export default Tabs;
