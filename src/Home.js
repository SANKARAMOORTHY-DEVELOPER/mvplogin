import { Button } from "react-bootstrap";
import React from 'react'
import ReactDOM from 'react-dom'


export default function Home({ connect }) {
  return (
    <div className="connect">
      <p>Connect Wallet to Celo Blockchain</p> 
 <Button variant="primary" onClick={() => connect()}>
        Connect Wallet
      </Button>
    </div>
  );
}
