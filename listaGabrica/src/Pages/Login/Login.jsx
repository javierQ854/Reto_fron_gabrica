import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const usenavigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/login", formData);
            localStorage.setItem("token", res.data.token);
            usenavigate("Lista")
        } catch (err) {
            setError("Credenciales inválidas");
        }
    };

    return (
        <div className="inicial">
            <img src="./LogoPhone.PNG"  alt="Logo"></img>
            <form className="formulario" onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                <TextField sx={{
                    input: { color: "#989CA3" }, // Color del texto dentro del input
                    label: { color: "#989CA3" }, // Color inicial del label
                    "& .MuiFormLabel-root": { color: "#989CA3" }, // Color del label normal
                    "& .Mui-focused": { color: "#3D0559" }, // Color del label cuando está enfocado
                    "& .MuiFormLabel-asterisk": { color: "#3D0559" }, // Color del asterisco (*)
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#989CA3" }, // Color del borde normal
                        "&:hover fieldset": { borderColor: "#B0B4BB" }, // Borde al pasar el mouse
                        "&.Mui-focused fieldset": { borderColor: "#989CA3" }, // Borde al enfocar
                    },
                }} size="small" label="Email" type="email" name="email" onChange={handleChange} required />
                <TextField sx={{
                    input: { color: "#989CA3" }, // Color del texto dentro del input
                    label: { color: "#989CA3" }, // Color inicial del label
                    "& .MuiFormLabel-root": { color: "#989CA3" }, // Color del label normal
                    "& .Mui-focused": { color: "#3D0559" }, // Color del label cuando está enfocado
                    "& .MuiFormLabel-asterisk": { color: "#3D0559" }, // Color del asterisco (*)
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#989CA3" }, // Color del borde normal
                        "&:hover fieldset": { borderColor: "#B0B4BB" }, // Borde al pasar el mouse
                        "&.Mui-focused fieldset": { borderColor: "#989CA3" }, // Borde al enfocar
                    },
                }} size="small" label="Contraseña" type="password" name="password" onChange={handleChange} required />
                <Button sx={{
                    backgroundColor: "#3D0559", // Color de fondo normal
                    color: "white", // Color del texto
                    "&:hover": {
                        backgroundColor: "#6A089C", // Color al pasar el mouse
                    },
                }} variant="contained" type="submit">Ingresar</Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
