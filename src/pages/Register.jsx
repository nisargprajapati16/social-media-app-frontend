import { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    setErrors({});
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <h1>Register</h1>

        <Form.Input
          type="text"
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
          error={!!errors.username}
        />
        <Form.Input
          type="email"
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          onChange={onChange}
          error={!!errors.email}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
          error={!!errors.password}
        />
        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm password..."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          error={!!errors.confirmPassword}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {!!Object.keys(errors).length && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      token
      id
      email
      username
      createdAt
    }
  }
`;

export default Register;
