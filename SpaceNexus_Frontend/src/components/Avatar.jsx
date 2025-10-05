import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AvatarModel({
  url,
  position = [0, 0, 0],
  scale = 1,
  id,
  hovered,
  setHovered,
  onClick
}) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();
  const meshes = useRef([]);

  useEffect(() => {
    const temp = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 1;
        child.castShadow = true;
        child.receiveShadow = true;
        temp.push(child);
      }
    });
    meshes.current = temp;

    // inicializar escala base
    if (groupRef.current) {
      groupRef.current.scale.set(scale, scale, scale);
    }
  }, [scene, scale]);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += 0.01;

    const shouldBeVisible = hovered === null || hovered === id;
    const targetOpacity = shouldBeVisible ? 1 : 0.1;
    const targetScale = shouldBeVisible ? scale * 1.05 : scale * 0.85;
    const targetZ = shouldBeVisible ? position[2] : position[2] - 2;

    // Fade materiales
    meshes.current.forEach((mesh) => {
      mesh.material.opacity = THREE.MathUtils.lerp(
        mesh.material.opacity,
        targetOpacity,
        0.08
      );
    });

    // Interpolar escala
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );

    // Interpolar posición Z
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.08
    );
  });

  return (
    <group
       ref={groupRef}
  position={position}
  onPointerEnter={(e) => {
    e.stopPropagation();
    console.log("🟡 Hover sobre:", id);
    setHovered(id);
  }}
  onPointerLeave={(e) => {
    e.stopPropagation();
    console.log("⚪ Salió hover:", id);
    setHovered(null);
  }}
  onClick={(e) => {
    e.stopPropagation();
    console.log("🟢 Clic detectado en:", id);
    if (onClick) onClick(); // 👈 este debe llamar al handleSelectRole
  }}
    >
      <primitive object={scene} />
    </group>
  );
}