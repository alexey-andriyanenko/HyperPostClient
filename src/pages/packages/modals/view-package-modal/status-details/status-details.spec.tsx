import React from "react";

import { appTestRender } from "src/shared/tests";
import {
  packageMock,
  packageSentMock,
  packageArrivedMock,
  packageReceivedMock,
  packageArchivedMock,
} from "src/models/mocks";

import { StatusDetails } from "./status-details";
import { within } from "@testing-library/dom";

describe("StatusDetails", () => {
  it("renders statuses", async () => {
    const { findByText, getByText } = await appTestRender(<StatusDetails data={packageMock} />);

    expect(await findByText("Created")).toBeInTheDocument();
    expect(getByText("Sent")).toBeInTheDocument();
    expect(getByText("Arrived")).toBeInTheDocument();
    expect(getByText("Received")).toBeInTheDocument();
    expect(getByText("Archived")).toBeInTheDocument();
  });

  it('renders "Created" status', async () => {
    const { findByTestId, getByTestId } = await appTestRender(<StatusDetails data={packageMock} />);
    const created = await findByTestId("created-complete");

    expect(within(created).getByText("01/01/2020")).toBeInTheDocument();

    expect(getByTestId("sent-incomplete")).toBeInTheDocument();
    expect(getByTestId("arrived-incomplete")).toBeInTheDocument();
    expect(getByTestId("received-incomplete")).toBeInTheDocument();
    expect(getByTestId("archived-incomplete")).toBeInTheDocument();
  });

  it('renders "Sent" status', async () => {
    const { findByTestId, getByTestId } = await appTestRender(
      <StatusDetails data={packageSentMock} />,
    );
    const sent = await findByTestId("sent-complete");

    expect(within(sent).queryByText("02/01/2020")).toBeInTheDocument();

    expect(getByTestId("created-complete")).toBeInTheDocument();

    expect(getByTestId("arrived-incomplete")).toBeInTheDocument();
    expect(getByTestId("received-incomplete")).toBeInTheDocument();
    expect(getByTestId("archived-incomplete")).toBeInTheDocument();
  });

  it('renders "Arrived" status', async () => {
    const { findByTestId, getByTestId } = await appTestRender(
      <StatusDetails data={packageArrivedMock} />,
    );
    const arrived = await findByTestId("arrived-complete");

    expect(within(arrived).queryByText("03/01/2020")).toBeInTheDocument();

    expect(getByTestId("created-complete")).toBeInTheDocument();
    expect(getByTestId("sent-complete")).toBeInTheDocument();

    expect(getByTestId("received-incomplete")).toBeInTheDocument();
    expect(getByTestId("archived-incomplete")).toBeInTheDocument();
  });

  it('renders "Received" status', async () => {
    const { findByTestId, getByTestId } = await appTestRender(
      <StatusDetails data={packageReceivedMock} />,
    );
    const received = await findByTestId("received-complete");

    expect(within(received).queryByText("04/01/2020")).toBeInTheDocument();

    expect(getByTestId("created-complete")).toBeInTheDocument();
    expect(getByTestId("sent-complete")).toBeInTheDocument();
    expect(getByTestId("arrived-complete")).toBeInTheDocument();

    expect(getByTestId("archived-incomplete")).toBeInTheDocument();
  });

  it('renders "Archived" status', async () => {
    const { findByTestId, getByTestId } = await appTestRender(
      <StatusDetails data={packageArchivedMock} />,
    );
    const archived = await findByTestId("archived-complete");

    expect(within(archived).queryByText("05/01/2020")).toBeInTheDocument();

    expect(getByTestId("created-complete")).toBeInTheDocument();
    expect(getByTestId("sent-complete")).toBeInTheDocument();
    expect(getByTestId("arrived-complete")).toBeInTheDocument();
    expect(getByTestId("received-complete")).toBeInTheDocument();
  });
});
