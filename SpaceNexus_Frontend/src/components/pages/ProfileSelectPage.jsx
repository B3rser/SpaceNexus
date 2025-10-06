import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function SelectRole() {
  const navigate = useNavigate();
  const { role } = useParams();
  const {setRole} = useUser();

  useEffect(() => {
        document.title = "Selecting role...";
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    },2000);

    setRole(role);

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
