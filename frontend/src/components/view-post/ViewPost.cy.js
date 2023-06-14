import React from "react";
import { render, screen } from "@testing-library/react";
import ViewPost from "./ViewPost";

describe('ViewPost', () => {
  it('renders loading state', () => {
    render(<ViewPost />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});