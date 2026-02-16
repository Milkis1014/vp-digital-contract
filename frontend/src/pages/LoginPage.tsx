import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/createClient";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      setErrorMessage(authError.message);
      setLoading(false);
    } else {
      const origin = location.state?.from?.pathname || "/";
      navigate(origin, { replace: true });
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
          boxShadow: 3,
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

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          id="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
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
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </Box>
    </Container>
  );
};
export default LoginPage;
