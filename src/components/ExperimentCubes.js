import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const RotatingCube = ({ position, size }) => {
  const cubeRef = useRef();

  useEffect(() => {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(position[0], position[1], position[2]);

    cubeRef.current = cube;
  }, [position, size]);

  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  return null;
};

const ExperimentCubes = () => {
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    camera.position.z = 5;

    renderer.setSize(window.innerWidth, window.innerHeight);

    sceneRef.current.appendChild(renderer.domElement);

    cameraRef.current = camera;
    rendererRef.current = renderer;
  }, []);

  useFrame(() => {
    if (cameraRef.current && rendererRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  });

  return (
    <div ref={sceneRef} />
  );
};

export default ExperimentCubes;
