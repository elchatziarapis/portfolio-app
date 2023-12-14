import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeJsBox = () => {
  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('box-container').appendChild(renderer.domElement);

    // Create a box
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the box
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      document.getElementById('box-container').removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array means useEffect runs once after initial render

  return <div id="box-container" />;
};

export default ThreeJsBox;
