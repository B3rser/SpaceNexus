import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();
  const { role } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("➡️ Redirigiendo al home...");
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        position: "fixed", 
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(3px)", // efecto sutil sobre el fondo
        zIndex: 1000, // aseguramos que quede encima
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          padding: "2rem 3rem",
          borderRadius: "1rem",
          fontSize: "1.5rem",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        Rol seleccionado: <strong>{role}</strong> <br />
        Cargando datos de la misión...
      </div>
    </div>
  );
}
