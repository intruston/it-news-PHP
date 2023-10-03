import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewsContext from "../../utils/NewsContext";
import NewsList from "../NewsList";

//Test checks:
//that news items are rendered in the correct order based on their importance and publishing time.
//that news images are rendered only for the important items.

describe("NewsList", () => {
  const news = [
    {
        _id: "6414f1cfae9aca4bf30ed757",
        article: "12 Hidden iPhone Features More People Should Be Using",
        important: true,
        author: "Nelson Aguilar",
        publishing_time: "2023-03-17T06:15:00Z",
        image: "https://www.cnet.com/a/img/resize/3a2482b6ed2d098e923a1f76f5c49329e09f8e32/hub/2022/09/14/673fbd21-614e-4801-859f-39dc0b415a6c/apple-iphone-14-8188.jpg?auto=webp&fit=crop&height=675&width=1200",
        text: "Discover what your iPhone is capable of with these lesser-known iOS features and settings.",
      },
    {
      _id: "6414f1cfae9aca4bf30ed752",
      article: "Got a New iPhone? Here's How to Take Your Best Photos Ever",
      important: false,
      author: "Andrew Lanxon",
      publishing_time: "2023-03-17T05:00:00Z",
      image: "https://www.cnet.com/a/img/resize/d99f708b1e6c7db1ffda00fc1f5d8e35ca7da558/hub/2022/10/05/c29087ff-e885-4668-8cde-8de5a609f716/apple-iphone-14-pro-cnet-promo-11.jpg?auto=webp&fit=crop&height=675&width=1200",
      text: "Whether you have an iPhone 14 Pro or an earlier phone, these pro tips will help you get your best ever photos.",
    },
  ];

  test("renders the news items in the correct order", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NewsContext.Provider value={{ news }}>
          <NewsList />
        </NewsContext.Provider>
      </MemoryRouter>
    );

    expect(getByText("12 Hidden iPhone Features More People Should Be Using")).toBeInTheDocument();
    expect(getByText("Got a New iPhone? Here's How to Take Your Best Photos Ever")).toBeInTheDocument();
    expect(getByText("12 Hidden iPhone Features More People Should Be Using").closest(".news-container-0")).toBeTruthy();
  });

  test("renders news images for important and first items", () => {
    const { getByAltText, queryByAltText } = render(
      <MemoryRouter>
        <NewsContext.Provider value={{ news }}>
          <NewsList />
        </NewsContext.Provider>
      </MemoryRouter>
    );

    expect(getByAltText("6414f1cfae9aca4bf30ed757")).toBeInTheDocument();
    expect(queryByAltText("6414f1cfae9aca4bf30ed752")).not.toBeInTheDocument();
  });
});
