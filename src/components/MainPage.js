import NavBar from "./NavBar";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';


function ThreeJSComponent() {
    const containerRef = useRef();
    const controlsRef = useRef();
    const [isWireframe, setIsWireframe] = useState(false);
    useEffect(() => {
        let camera, controls, scene, renderer, clock, planeSolid, planeWireframe, sun, sunLight;



        // Initialize the ThreeJS scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.Fog(0x000000, 100, 150);


        // Initialize perspective camera
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
        camera.position.y = 50;
        camera.position.x = 0;
        camera.position.z = -100;
        camera.lookAt(-40, -120, 220)


        // Initialize the clocking tick
        clock = new THREE.Clock();




        // Initialize renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Sun
        const sunGeometry = new THREE.SphereGeometry(12, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // Black color
        sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.x = 45;
        sun.position.y = 35;
        sun.position.z = 70;
        scene.add(sun);

        // Add a plane to the scene (solid part)
        const geometrySolid = new THREE.PlaneGeometry(500, 200, 50, 50);
        const materialSolid = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: true });

        planeSolid = new THREE.Mesh(geometrySolid, materialSolid);
        planeSolid.rotateX(-Math.PI / 2); // Rotate the plane to be horizontal
        scene.add(planeSolid);

        // Add a plane to the scene (wireframe part)

        const geometryWireframe = new THREE.WireframeGeometry(geometrySolid);
        const materialWireframe = new THREE.LineBasicMaterial({ side: THREE.DoubleSide, color: 0xffffff });

        planeWireframe = new THREE.LineSegments(geometryWireframe, materialWireframe);
        planeWireframe.rotateX(-Math.PI / 2); // Rotate the plane to be horizontal
        scene.add(planeWireframe);

        // Event listeners
        window.addEventListener('resize', onWindowResize);
        animate();


        return () => {
            window.removeEventListener('resize', onWindowResize);
            containerRef.current.removeChild(renderer.domElement);
        };

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Render loop
        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            const delta = clock.getDelta();
            const time = clock.getElapsedTime() * 10;

            // Update wave position for the entire plane
            const position = geometrySolid.attributes.position;
            const position2 = geometryWireframe.attributes.position;
            const wavelength = 10;
            for (let i = 0; i < position.count; i++) {
                const x = position.getX(i);
                const z = wavelength * Math.sin((x / 20) + (time) / 15);
                position.setZ(i, z);
            }
            for (let i = 0; i < position2.count; i++) {
                const x = position2.getX(i);
                const z = wavelength * Math.sin((x / 20) + (time) / 15);
                position2.setZ(i, z);
            }



            position.needsUpdate = true;
            position2.needsUpdate = true;
            renderer.render(scene, camera);
        }



    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1,
                opacity: 0.8
            }}
        />
    );
}
export default function MainPage() {

    return (
        <div className="text-gray-700">
            <NavBar />
            <ThreeJSComponent />
        </div>

    )
}
