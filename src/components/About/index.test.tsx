import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import About from ".";

describe("Event item", () => {
  let root: RenderResult;

  beforeEach(() => {
    root = render(
      <ApolloProvider
        client={
          new ApolloClient({
            uri: "https://api.spacex.land",
            cache: new InMemoryCache(),
          })
        }
      >
        <About />
      </ApolloProvider>
    );
  });


  test("should render spacex heading", () => {
    root.findByText(/about spacex/i);
  });

//   test("should render spacex summary", () => {
//     expect(
//       root.getByText(
//         /SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets./i
//       )
//     ).toBeInTheDocument();
//   });

});
