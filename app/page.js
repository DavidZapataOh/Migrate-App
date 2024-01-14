"use client";
import Image from 'next/image'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../src/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
    connectorsForWallets,
    getDefaultWallets,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    polygon,
    polygonMumbai,
  } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const projectId = process.env.REACT_APP_PROJECT_ID;

  const {chains, publicClient, webSocketPublicClient} = configureChains(
    [polygon, polygonMumbai],
    [publicProvider()]
  );

  const {wallets} = getDefaultWallets({
    appName: "Migrate",
    projectId,
    chains,
  });

  const demoAppInfo = {
    appName: "Migrate",
  };

  const connectors = connectorsForWallets([
    ...wallets,
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });


export default function Home() {
  return (
    <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
  )
}
