// Import necessary dependencies and components
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getDatabase from "@db/database";
import { v4 as uuidv4 } from "uuid";

// Import custom components
import Button from "@component/button/Button";
import Input from "@component/input/Input";

export default function Login() {
  const [value, setValue] = React.useState<string>("");

  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Get the database instance
    const db = await getDatabase();

    // Check if the user already exists in the database
    const user = await db.users
      .findOne({
        selector: {
          username: value,
        },
      })
      .exec();

    // If the user does not exist, add them to the database
    if (!user) {
      const addData = {
        _id: uuidv4(),
        username: value,
      };
      await db.users.insert(addData);
    }

    // Set the username in local storage and reset the input value
    localStorage.setItem("username", value);
    setValue("");

    // Navigate to the home page
    navigate("/");
  };

  return (
    <LoginLayout>
      <LoginContent>
        <form onSubmit={onSubmit}>
          <Input
            label="Username:"
            type="text"
            name="Task"
            placeholder="Enter username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button type="submit" variant="primary">
            Signin or Signup
          </Button>
        </form>
      </LoginContent>
    </LoginLayout>
  );
}

// Styled components for layout and content styling
const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const LoginContent = styled.div`
  width: 100%;
  max-width: 450px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  background-color: white;
  padding: 30px;
  margin-top: 7vh;
`;
