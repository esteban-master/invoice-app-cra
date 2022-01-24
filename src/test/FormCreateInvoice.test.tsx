import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormCreateInvoice } from "../components/FormCreateInvoice";
import invoicesData from "../data";

describe("Form Create Invoice", () => {
  it("Submit with values mock", async () => {
    const [firstInvoice] = invoicesData;
    const submitMock = jest.fn();
    render(<FormCreateInvoice submit={submitMock} />);
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

    userEvent.type(senderStreet, firstInvoice.senderAddress.street);
    userEvent.type(senderCity, firstInvoice.senderAddress.city);
    userEvent.type(senderPostCode, firstInvoice.senderAddress.postCode);
    userEvent.type(senderCountry, firstInvoice.senderAddress.country);

    userEvent.type(clientName, firstInvoice.clientName);
    userEvent.type(clientEmail, firstInvoice.clientEmail);

    userEvent.type(clientStreet, firstInvoice.clientAddress.street);
    userEvent.type(clientCity, firstInvoice.clientAddress.city);
    userEvent.type(clientPostCode, firstInvoice.clientAddress.postCode);
    userEvent.type(clientCountry, firstInvoice.clientAddress.country);
    userEvent.type(createdAt, firstInvoice.createdAt);
    userEvent.type(description, firstInvoice.description);

    firstInvoice.items.forEach((item, index) => {
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

    userEvent.click(
      screen.getByRole("button", { exact: true, name: "Submit" })
    );

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledTimes(1);
    });
    expect(submitMock).toHaveBeenCalledWith({ ...firstInvoice });
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
