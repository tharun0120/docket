import React from "react";
import Account from "../components/Account";
import Header from "../components/Header";

function AccountPage() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "25px",
      }}>
      <Header />
      <Account />
    </section>
  );
}

export default AccountPage;
