import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/createClient"; // Make sure this path points to your supabase file

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      alert("Login failed: " + authError.message);
    } else {
      navigate("/");
    }
  };
  return (
    <Container
      sx={{
        margin: "150px auto",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "400px",
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "secondary.main",
            fontWeight: "bold",
          }}
        >
          Sign In
        </Typography>
        <TextField
          required
          id="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          required
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            color: "secondary.contrastText",
            backgroundColor: "secondary.main",
          }}
          type="submit"
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};
export default LoginPage;
