import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import AvatarModel from "../Avatar";
import RoleInfoPanel from "../RoleInfoPanel";
import { useNavigate } from "react-router-dom";


export default function Welcome() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  // ✅ Cuando se selecciona un rol
  const handleSelectRole = (role) => {
    console.log("✅ Avatar clickeado:", role);
    navigate(`/select-role/${role}`); // redirige con el rol seleccionado
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30px",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: "2px",
        }}
      >
        ¿Quién eres en esta misión?
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#a0c0ff" />

        <group position={[0, -0.5, 0]}>
          <AvatarModel
            url="/avatars/scientific1.glb"
            position={[-3, 0, 0]}
            scale={0.15}
            id="scientific"
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => handleSelectRole("Científico")}
          />
          <AvatarModel
            url="/avatars/investor1.glb"
            position={[0, 0, 0]}
            scale={1.1}
            id="investor"
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => handleSelectRole("Inversionista")}
          />
          <AvatarModel
            url="/avatars/astronaut.glb"
            position={[3, 0, 0]}
            scale={0.5}
            id="astronaut"
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => handleSelectRole("Astronauta")}
          />
        </group>

        <OrbitControls enablePan={false} enableZoom={false} target={[0, 0, 0]} />
      </Canvas>

      <RoleInfoPanel hovered={hovered} />
    </div>
  );
}