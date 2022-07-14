import { ConnectButton } from "web3uikit";
import React from "react";

export default function Header() {
  return (
    <div className="header-button">
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
