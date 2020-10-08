import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, GetByText, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  
  /* Test number 1 */
  it("defaults to Monday and changes the schedule when a new day is selected", 
    async () => {
      const { getByText } = render(<Application />);

      await waitForElement(() => getByText("Monday"));
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  /* Test number 2 */
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", 
    async() => {
      const { container } = render(<Application />);

      await waitForElement(() => getByText(container, "Archie Cohen"))      
      const appointment = getAllByTestId(container, "appointment")[0];

      fireEvent.click(getByAltText(appointment, "Add"));
      
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: { value: "Lydia Miller-Jones" }});
      
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
      fireEvent.click(getByText(appointment, "Save"));
      expect(getByText(appointment, "Saving")).toBeInTheDocument();

      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

      const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    });

  /* Test number 3 */
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1",
    async()=> {
      const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      fireEvent.click(queryByAltText(appointment, "Delete"));
 
      expect(getByText(appointment, "Confirm")).toBeInTheDocument();

      fireEvent.click(getByText(appointment, "Confirm"));
      
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();

      await waitForElement(() => getByAltText(appointment, "Add"));

      const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    });

    /* Test number 4 */
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {
    async() => {
  // 1. Render the Application.
      const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3.Firts find Archie's appointment and then click the "Edit" button on this one specifically
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. change the student's name.
      fireEvent.change(getByText(container, "Archie Cohen"), {
        target: { value: "Lydia Miller-Jones" }
      });
    
  // 5. change the interviewer's name.
      fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

  // 6. Click the "Save" button on that same appointment.
      fireEvent.click(getByText(appointment, "Save"));
      
  // 7. Check that the element with the text "Saving" is displayed.
      expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  
    debug();    
    }
  });

  /* Test number 5 */
  it("shows the save error when failing to save an appointment", () => {
    
  // Part 1: as per test 2, add new appointment
    async() => {
      const { container } = render(<Application />);

      await waitForElement(() => getByText(container, "Archie Cohen"))
      const appointment = getAllByTestId(container, "appointment")[0];
      fireEvent.click(getByAltText(appointment, "Add"));
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
      });
            
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"));
      
  // Part 2: mock the rejected promise 
      axios.put.mockRejectedValueOnce();

  // Part 3: test the error 
      expect(getByText(appointment, "Error")).toBeInTheDocument();
      fireEvent.click(getByAltText(appointment, "Close"));
      expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
      
    };
  });

   /* Test number 6 */
  it("shows the delete error when failing to delete an appointment", () => {
    
    // Part 1: as per test 3, start process to delete appointment
    async()=> {
          const { container, debug } = render(<Application />);
        await waitForElement(() => getByText(container, "Archie Cohen"));
          const appointment = getAllByTestId(container, "appointment").find(
            appointment => queryByText(appointment, "Archie Cohen")
          );
          fireEvent.click(queryByAltText(appointment, "Delete"));
        
    // Part 2: mock the rejected promise 
        axios.put.mockRejectedValueOnce();
  
    // Part 3: test the error 
        expect(getByText(appointment, "Error")).toBeInTheDocument();
        fireEvent.click(getByAltText(appointment, "Close"));
        expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
      };
    });
});
