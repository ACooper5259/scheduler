import React from "react";

import { render, prettyDOM, cleanup, queryByText } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";


afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  xit("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers = {interviewers}/>
      );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  xit("renders with initial student name", () => {
    const { getByTestId } = render (
      <Form interviewers = {interviewers} name = "Lydia Miller-Jones"/>
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });






  xit("validates that the student name is not blank", () => {
    /* 1. validation is shown */
     /* 1.1. Create the mock onSave function */
    // const mockOnSave = jest.fn()
    // /* 1.2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    // const { container, getByText } = render (<Form
    //   onSave = {mockOnSave}
    // /* 1.3. Click the save button */
    // const button = getByText('save')
    // console.log (prettyDOM(container))
    // expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const mockOnSave = jest.fn()
    const { getByText, queryByText } = render (
      <Form 
        interviewers = {interviewers} 
        name = "Lydia Miller-Jones" 
        onSave = {mockOnSave}
      />);
  
    const button = getByText('Save')
    fireEvent.click(button)
    
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(mockOnSave).toHaveBeenCalledTimes(1);

    expect(mockOnSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });


});