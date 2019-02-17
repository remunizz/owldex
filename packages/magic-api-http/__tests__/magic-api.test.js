jest.mock("axios");

const { fetchCards } = require("../cjs");
const axios = require("axios");

describe("Magic service API", async () => {
  const mockCard = { name: "mock-card-name" };
  const count = 100;
  const link = "mock-link";
  const pageSize = 100;
  const rateLimit = 1000;
  const rateLimitRemaining = 999;
  const totalCount = 283;

  describe("common response", () => {
    beforeAll(() => {
      const headers = {
        count: count.toString(),
        link: link,
        "page-size": pageSize.toString(),
        "ratelimit-limit": rateLimit.toString(),
        "ratelimit-remaining": rateLimitRemaining.toString(),
        "total-count": totalCount.toString()
      };

      const mockCards = { cards: [{ ...mockCard }] };
      const mockResponse = { data: mockCards, headers: { ...headers } };
      axios.request.mockResolvedValue(mockResponse);
    });

    afterAll(() => {
      axios.request.mockReset();
    });

    it("should have a valid pagination", async () => {
      const response = await fetchCards();
      expect(response.pagination).toMatchObject({
        count,
        pageSize,
        ratelimitLimit: rateLimit,
        ratelimitRemaining: rateLimitRemaining,
        totalCount
      });
    });
  });

  describe("simple response", async () => {
    beforeAll(() => {
      const mockCards = { cards: [{ ...mockCard }] };
      const mockResponse = { data: mockCards };
      axios.request.mockResolvedValue(mockResponse);
    });

    afterAll(() => {
      axios.request.mockReset();
    });

    it("should contain mock card", async () => {
      const response = await fetchCards();
      expect(response.items.cards).toContainEqual({ ...mockCard });
    });

    it("should use queries", async () => {
      const response = await fetchCards({ name: "mock" });
      expect(response.items.cards.length).toBe(1);
    });
  });
});
