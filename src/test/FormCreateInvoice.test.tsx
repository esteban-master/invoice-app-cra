import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormCreateInvoice } from "../components/FormCreateInvoice";
import { InvoicesContextProvider } from "../context/invoiceContext";

const fakeData = {
  createdAt: "2021-08-18",
  description: "Re-branding",
  paymentTerms: 1,
  clientName: "Jensen Huang",
  clientEmail: "jensenh@mail.com",
  senderAddress: {
    street: "19 Union Terrace",
    city: "London",
    postCode: "E1 3EZ",
    country: "United Kingdom",
  },
  clientAddress: {
    street: "106 Kendell Street",
    city: "Sharrington",
    postCode: "NR24 5WQ",
    country: "United Kingdom",
  },
  items: [
    {
      name: "Brand Guidelines",
      quantity: 1,
      price: 1800.9,
      total: 1800.9,
    },
  ],
  total: 1800.9,
};

describe("Form Create Invoice", () => {
  it("Submit with values mock", async () => {
    const submitMock = jest.fn();
    render(
      <InvoicesContextProvider>
        <FormCreateInvoice submit={submitMock} />
      </InvoicesContextProvider>
    );
    const {
      senderCity,
      senderCountry,
      senderPostCode,
      senderStreet,
      clientName,
      clientEmail,
      clientStreet,
      clientCity,
      clientCountry,
      clientPostCode,
      createdAt,
      description,
    } = getFields();

    expect(
      await screen.findByRole("button", { name: "Add new Item" })
    ).toBeInTheDocument();

    userEvent.type(senderStreet, fakeData.senderAddress.street);
    userEvent.type(senderCity, fakeData.senderAddress.city);
    userEvent.type(senderPostCode, fakeData.senderAddress.postCode);
    userEvent.type(senderCountry, fakeData.senderAddress.country);

    userEvent.type(clientName, fakeData.clientName);
    userEvent.type(clientEmail, fakeData.clientEmail);

    userEvent.type(clientStreet, fakeData.clientAddress.street);
    userEvent.type(clientCity, fakeData.clientAddress.city);
    userEvent.type(clientPostCode, fakeData.clientAddress.postCode);
    userEvent.type(clientCountry, fakeData.clientAddress.country);
    userEvent.type(createdAt, fakeData.createdAt);
    userEvent.type(description, fakeData.description);

    fakeData.items.forEach((item, index) => {
      userEvent.type(screen.getByLabelText(`item.${index}.name`), item.name);
      userEvent.type(
        screen.getByLabelText(`item.${index}.quantity`),
        item.quantity.toString()
      );
      userEvent.type(
        screen.getByLabelText(`item.${index}.price`),
        item.price.toString()
      );
    });

    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledTimes(1);
    });
    expect(submitMock).toHaveBeenCalledWith({ ...fakeData });
  });
});

function getFields() {
  const senderStreet = screen.getByLabelText("Sender Street");
  const senderCity = screen.getByLabelText("Sender City");
  const senderPostCode = screen.getByLabelText("Sender PostCode");
  const senderCountry = screen.getByLabelText("Sender Country");
  const clientName = screen.getByLabelText("Client Name");
  const clientEmail = screen.getByLabelText("Client Email");
  const clientStreet = screen.getByLabelText("Client Street");
  const clientCity = screen.getByLabelText("Client City");
  const clientPostCode = screen.getByLabelText("Client PostCode");
  const clientCountry = screen.getByLabelText("Client Country");
  const createdAt = screen.getByLabelText("CreatedAt");
  const description = screen.getByLabelText("Description");
  return {
    senderPostCode,
    senderStreet,
    senderCountry,
    senderCity,
    clientName,
    clientEmail,
    clientStreet,
    clientCity,
    clientPostCode,
    clientCountry,
    createdAt,
    description,
  };
}
