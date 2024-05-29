import "./App.css";
import { Lucid, Blockfrost } from "lucid-cardano";
import { useState } from "react";

function App() {
  const [cbor, setCbor] = useState("");

  const signTransaction = async () => {
    const lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        "previewWenCzTRwLmYSJuTHiZv5yiqdkJ7l2Iih"
      ),
      "Preview"
    );
    const api = await window.cardano.nami.enable();
    lucid.selectWallet(api);
    const unsigned = await lucid
      .newTx()
      .payToAddress(
        "addr_test1qz4ez3z8qte2yxvq3zv22cdw27peen83dx6cxl64de2zw6sjuj26mwkl3nnal9g0e9yqlnh6jux7eswrduc0jpm6fa7qrsc2m5",
        { lovelace: 200000000n }
      )
      .complete();
    const signed = await unsigned.sign().complete();
    const hash = await signed.submit();
    setCbor(hash);
  };
  return (
    <div className="App">
      <button onClick={signTransaction}>Sign transaction</button>
      <br/>
      <textarea value={cbor}/>
    </div>
  );
}

export default App;
