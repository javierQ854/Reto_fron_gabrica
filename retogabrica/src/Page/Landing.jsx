import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Landing.css";

const LandingPage = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        nit: "",
        nombrePunto: "",
        nombreEquipo: "",
        ciudad: "",
        promotor: "",
        rtc: "",
        tratamientoDatos: false,
        capitanUusuario: "",
        ip: "",
        fecha: "",
        hora: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
        const rtcRegex = /^[0-9]+$/;
        const invalidChars = /[#¿?,]/;

        if (!formData.nombre.match(nameRegex)) return "Nombre inválido.";
        if (!formData.nit || invalidChars.test(formData.nit)) return "NIT inválido.";
        if (!formData.ciudad) return "Seleccione una ciudad.";
        if (!formData.rtc.match(rtcRegex)) return "RTC debe contener solo números.";
        if (!formData.tratamientoDatos) return "Debe aceptar el tratamiento de datos.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }
        try {
            await axios.post("http://localhost:8000/crear", formData);
            setSubmitted(true);
        } catch (error) {
            alert("Error al enviar los datos");
        }
    };

    if (submitted) {
        return (
            <div className="registro_contenedor">
                <img src="/logoFinal.PNG" alt="Logo final"></img>
                <h2>¡Gracias por registrarte!</h2>
            </div>
        )
    }

    return (
        <div className="contenedor_principal">
            <img className="img_fondo" src="/Logo.PNG" alt="Logo" />
            <div className="c_imagen">
                <img className="img_fondo_phone" src="/LogoPhone.PNG" alt="Logo" />
            </div>

            <form className="formulario" onSubmit={handleSubmit}>

                <label>
                    <span className="numero">1</span> Inscripción punto de venta
                </label>

                <input
                    className="form-control"
                    placeholder="Nombre del cliente"
                    type="text"
                    name="nombre"
                    required
                    autoComplete="off"
                    value={formData.nombre}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, "");
                        setFormData({ ...formData, nombre: value });
                    }}
                />

                <input
                    className="form-control"
                    placeholder="NIT"
                    type="text"
                    name="nit"
                    required
                    autoComplete="off"
                    value={formData.nit}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[#¿?,]/g, "");
                        setFormData({ ...formData, nit: value });
                    }}
                />

                <input
                    className="form-control"
                    placeholder="Nombre del punto"
                    type="text"
                    name="nombrePunto"
                    autoComplete="off"
                    value={formData.nombrePunto}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[#¿?,]/g, "");
                        setFormData({ ...formData, nombrePunto: value });
                    }}
                />

                <input
                    className="form-control"
                    placeholder="Nombre del equipo"
                    type="text"
                    name="nombreEquipo"
                    autoComplete="off"
                    value={formData.nombreEquipo}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[#¿?,]/g, "");
                        setFormData({ ...formData, nombreEquipo: value });
                    }}
                />

                <select
                    className="form-select"
                    required
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                >
                    <option value="">Ciudad</option>
                    <option value="Cali">Cali</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Bogotá">Bogotá</option>
                </select>

                <input
                    className="form-control"
                    placeholder="Promotor"
                    type="text"
                    name="promotor"
                    autoComplete="off"
                    value={formData.promotor}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[#¿?,]/g, "");
                        setFormData({ ...formData, promotor: value });
                    }}
                />

                <input
                    type="text"
                    placeholder="RTC"
                    name="rtc"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="form-control"
                    autoComplete="off"
                    value={formData.rtc}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, rtc: value });
                    }}
                />

                <input
                    className="form-control"
                    placeholder="Capitán y/o usuario"
                    type="text"
                    name="capitanUusuario"
                    autoComplete="off"
                    value={formData.capitanUusuario}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[#¿?,]/g, "");
                        setFormData({ ...formData, capitanUusuario: value });
                    }}
                />

                <label>
                    <input
                        type="checkbox"
                        required
                        checked={formData.tratamientoDatos}
                        onChange={(e) => setFormData({ ...formData, tratamientoDatos: e.target.checked })}
                    />
                    Acepto el tratamiento de datos
                </label>

                <input type="hidden" value={formData.ip} />
                <input type="hidden" value={formData.fecha} />
                <input type="hidden" value={formData.hora} />

                <button className="btn-siguiente" type="submit">Siguiente</button>
            </form>
        </div>
    );
};

export default LandingPage;
