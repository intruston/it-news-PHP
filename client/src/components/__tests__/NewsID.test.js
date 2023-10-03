import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import NewsContext from "../../utils/NewsContext";
import NewsID from "../NewsID";

describe("NewsID", () => {
  const news = [
    {
      _id: "6414f1cfae9aca4bf30ed757",
      article: "12 Hidden iPhone Features More People Should Be Using",
      author: "Nelson Aguilar",
      publishing_time: "2023-03-17T06:15:00Z",
      image: "https://www.cnet.com/a/img/resize/3a2482b6ed2d098e923a1f76f5c49329e09f8e32/hub/2022/09/14/673fbd21-614e-4801-859f-39dc0b415a6c/apple-iphone-14-8188.jpg?auto=webp&fit=crop&height=675&width=1200",
      text: "Discover what your iPhone is capable of with these lesser-known iOS features and settings.",
    },
  ];

  test("displays the article when found", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/news/6414f1cfae9aca4bf30ed757"]}>
        <Routes>
          <Route path="/news/:id" element={<NewsContext.Provider value={{ news }}><NewsID /></NewsContext.Provider>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("12 Hidden iPhone Features More People Should Be Using")).toBeInTheDocument();
  });

  test("displays 404 message when article is not found", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/news/nonexistent-id"]}>
        <Routes>
          <Route path="/news/:id" element={<NewsContext.Provider value={{ news }}><NewsID /></NewsContext.Provider>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("404 Oops, news not found")).toBeInTheDocument();
  });
});