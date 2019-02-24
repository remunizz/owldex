import React, { ReactNode } from "react";
import { render } from "react-testing-library";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

export function renderWithRouter(
  ui: ReactNode,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

export function getMockCards() {
  return [
    {
      name: "Mirror Mockery",
      id: "ba3e32aa-946f-5538-a7c1-a3be17c249db",
      type: "Enchantment — Aura",
      rarity: "Common",
      text: "Mirror Mockery description."
    },
    {
      name: "Jester's Mask",
      id: "d354291e-52f7-5811-b698-ba9bcc877dc8",
      type: "Artifact",
      rarity: "Rare",
      text: "Jester's Mask description."
    }
  ];
}

export function getMockCard(index = 0) {
  return getMockCards()[index];
}
