import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();
  const { role } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("➡️ Redirigiendo al home...");
      navigate("/home");
    },4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(3px)", 
        zIndex: 1000, 
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",            
          left: "50%",            
          transform: "translate(-50%, -50%)", 
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "2rem",
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: "2px",
          fontStyle: "italic",      
          textShadow: "0 0 10px rgba(255,255,255,0.5)", 
        }}
      >
        Mode {role} loading mission data ...
      </div>


    </div>
  );
}
