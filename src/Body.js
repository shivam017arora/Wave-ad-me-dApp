import React from "react";
import Header from "./Header";
import Counter from "./Counter";
import Comment from "./Comment";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { getNetwork } from "./utils";
import { addresses, abi } from "./constants";

export default function Body() {
  const { chainId, isWeb3Enabled } = useMoralis();
  const [totalWaveCount, setTotalWaveCount] = React.useState(0);
  const [allWaves, setAllWaves] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const waveMeAddress =
    getNetwork(chainId) in addresses ? addresses[getNetwork(chainId)][0] : null;

  const { runContractFunction: getTotalWaves } = useWeb3Contract({
    abi,
    contractAddress: waveMeAddress,
    functionName: "getTotalWaves",
    params: {},
  });

  const { runContractFunction: wave } = useWeb3Contract({
    abi,
    contractAddress: waveMeAddress,
    functionName: "wave",
    params: {
      _message: message,
    },
  });

  const { runContractFunction: getWavers } = useWeb3Contract({
    abi,
    contractAddress: waveMeAddress,
    functionName: "getAllWaves",
    params: {},
  });

  const waveButtonClicked = async () => {
    if (message == "") {
      console.log("Enter a message first!");
    } else {
      await wave({
        onSuccess: async (tx) => await updateUI(tx),
        onError: (error) => console.log(error),
      });
    }
  };

  const getTotalWaveCount = async () => {
    await getTotalWaves({
      onSuccess: (result) => {
        setTotalWaveCount(result.toNumber());
        return result.toNumber();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const getWaversArray = async () => {
    await getWavers({
      onSuccess: (waves) => {
        console.log(waves);
        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });
        setAllWaves(wavesCleaned);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const updateUI = async (tx) => {
    console.log("Updating UI...");
    await getTotalWaveCount();
    await getWaversArray();
  };

  React.useEffect(() => {
    updateUI();
  }, [isWeb3Enabled, chainId]);

  const cantWave = isWeb3Enabled === false && waveMeAddress === null;

  return (
    <div className="mainContainer">
      <Header />
      <div className="dataContainer">
        <div className="header">Hey there!</div>
        <div className="bio">
          I am Shivam and I work as a Data Scientist so that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
          <textarea
            className="message-input-box"
            rows={2}
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <button
            className="waveButton"
            onClick={waveButtonClicked}
            disabled={cantWave}
          >
            Wave
          </button>
        </div>
        {waveMeAddress && (
          <div className="counter-container">
            <Counter number={totalWaveCount} desc="Total Waves" />
          </div>
        )}
        <h3 className="wave-h3-title">Wave Messages:</h3>
        {allWaves.map((wave, index) => {
          return (
            <div key={index}>
              <Comment
                address={wave.address}
                timestamp={wave.timestamp}
                message={wave.message}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
