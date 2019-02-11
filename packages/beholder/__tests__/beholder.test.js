"use strict";

const { behold, EventType } = require("../dist/umd");
const { MockLocalStorage: MockStorage } = require("./mock-local-forage");
const { expect } = require("chai");
require("mocha");

describe("beholder", async () => {
  it("should create the initial state", async () => {
    const beholder = behold("", "", {}, () => new MockStorage());
    const initState = await beholder.init();

    expect(initState).to.not.be.empty;
  });

  it("state ID should match init ID", async () => {
    const mockID = "MOCK-ID";
    const beholder = behold(mockID, "", {}, () => new MockStorage());
    const initState = await beholder.init();

    expect(initState.trackId).to.be.equal(mockID);
  });

  it("state language should match navigator language", async () => {
    const mockNavigator = {
      language: "pt-br",
      appVersion: ""
    };

    const beholder = behold("", "", {}, () => new MockStorage(), mockNavigator);
    const initState = await beholder.init();

    expect(initState.browserLanguage).to.be.equal(mockNavigator.language);
  });

  it("should read stored state", async () => {
    const mockState = {
      trackId: "12",
      platform: "MOCK-PLATFORM",
      localId: "MOCK-ID"
    };

    const mockLocalForage = new MockStorage();
    mockLocalForage.state = { [mockState.trackId]: { ...mockState } };

    const beholder = behold(mockState.trackId, "", {}, () => mockLocalForage);
    const initState = await beholder.init();

    expect(initState.localId).to.be.equal(mockState.localId);
  });

  it("should log pageView", async () => {
    const beholder = behold("", "", {}, () => new MockStorage());
    await beholder.init();

    const pageViewState = await beholder.pageView({
      title: "title",
      path: "/",
      location: "location"
    });

    expect(pageViewState.entities[EventType.PageView]).to.not.be.empty;
  });

  it("should log customEvents", async () => {
    const beholder = behold("", "", {}, () => new MockStorage());
    await beholder.init();

    const pageViewState = await beholder.custom({
      category: "MOCK_CATEGORY",
      action: "MOCK_ACTION"
    });

    expect(pageViewState.entities[EventType.Custom]).to.not.be.empty;
  });
});
