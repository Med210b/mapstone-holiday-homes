import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

// Helper to check WebGL support
const isWebGLAvailable = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
};

/**
 * WhiteLuxuryScene
 * 
 * Updated physics-based scene:
 * - 5 White matte blocks
 * - 1 Gold sphere
 * - Standard lighting (No HDRI)
 * - Cannon.es physics
 */
export const WhiteLuxuryScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(isWebGLAvailable());

  useEffect(() => {
    if (!mountRef.current || !isSupported) return;

    // --- Variables ---
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let controls: OrbitControls;
    let animationId: number;
    let world: CANNON.World;
    
    // Objects to sync
    let sphereBody: CANNON.Body;
    let sphereMesh: THREE.Mesh;
    const blockMeshes: THREE.Mesh[] = [];
    const blockBodies: CANNON.Body[] = [];

    // Cleanup function
    const cleanup = () => {
        window.removeEventListener('resize', handleResize);
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) {
            renderer.dispose();
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        }
    };

    let handleResize: () => void;

    try {
        // --- 1. Setup Renderer ---
        const canvas = document.createElement('canvas');
        mountRef.current.appendChild(canvas);

        renderer = new THREE.WebGLRenderer({ 
            canvas,
            antialias: true, 
            alpha: true 
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        
        // Use updated color space property for Three.js > r152
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // --- 2. Scene & Camera ---
        scene = new THREE.Scene();
        
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
        camera.position.set(3, 2, 5);
        scene.add(camera);

        // --- 3. Controls ---
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;

        // --- 4. Lighting ---
        // As per snippet: Hemisphere + Directional
        const hemi = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 0.4);
        scene.add(hemi);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 6, 3);
        dirLight.castShadow = true;
        // Optimize shadow map
        dirLight.shadow.mapSize.set(1024, 1024);
        dirLight.shadow.radius = 2;
        scene.add(dirLight);

        // --- 5. Materials ---
        const blockMat = new THREE.MeshStandardMaterial({
            color: "#ffffff", 
            roughness: 0.8
        });

        const goldMat = new THREE.MeshPhysicalMaterial({
            color: "#FFD700", 
            metalness: 1, 
            roughness: 0.1, 
            clearcoat: 1
        });

        // --- 6. Physics World ---
        world = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0)
        });

        const defaultMat = new CANNON.Material("default");
        const contactMat = new CANNON.ContactMaterial(defaultMat, defaultMat, {
            friction: 0.3, 
            restitution: 0.2
        });
        world.addContactMaterial(contactMat);

        // --- 7. Geometry ---

        // Helper to add blocks
        const addBlock = (w: number, h: number, d: number, x: number, y: number, z: number) => {
            // Three.js
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), blockMat);
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            blockMeshes.push(mesh);

            // Cannon.js
            const half = new CANNON.Vec3(w/2, h/2, d/2);
            const body = new CANNON.Body({
                mass: 0, // static
                shape: new CANNON.Box(half),
                material: defaultMat
            });
            body.position.set(x, y, z);
            world.addBody(body);
            blockBodies.push(body);
        };

        // Blocks based on snippet
        addBlock(1.2, 0.4, 1.2, -1, 0.2, 0);
        addBlock(0.8, 0.6, 0.8, 0.9, 0.3, -0.4);
        addBlock(1.6, 0.3, 0.7, 0, 0.15, 1);
        addBlock(0.5, 0.5, 1.0, 1.5, 0.25, 0.8);
        addBlock(1.0, 0.2, 0.5, -0.8, 0.1, -1.2);

        // Ground Plane
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshStandardMaterial({color: "#ffffff", roughness: 0.9})
        );
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        const groundBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
            material: defaultMat
        });
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        world.addBody(groundBody);

        // Gold Sphere
        sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 64, 64), goldMat);
        sphereMesh.castShadow = true;
        scene.add(sphereMesh);

        sphereBody = new CANNON.Body({
            mass: 2,
            shape: new CANNON.Sphere(0.35),
            position: new CANNON.Vec3(0, 2, 0.4),
            material: defaultMat,
            linearDamping: 0.08,
            angularDamping: 0.08
        });
        sphereBody.velocity.set(0.15, -0.2, 0.05);
        sphereBody.angularVelocity.set(0.2, 0.15, 0.1);
        world.addBody(sphereBody);


        // --- 8. Animation Loop ---
        let lastTime = 0;
        const animate = (time: number) => {
            animationId = requestAnimationFrame(animate);

            if (lastTime !== undefined) {
                const dt = Math.min((time - lastTime) / 1000, 0.033);
                world.step(1/60, dt); // Fixed time step
            }
            lastTime = time;

            // Sync Sphere
            sphereMesh.position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
            sphereMesh.quaternion.set(sphereBody.quaternion.x, sphereBody.quaternion.y, sphereBody.quaternion.z, sphereBody.quaternion.w);

            // Subtle Camera Drift
            camera.position.x = 3 + Math.sin(time * 0.0003) * 0.2;
            camera.lookAt(0, 0.3, 0);

            controls.update();
            renderer.render(scene, camera);
        };
        requestAnimationFrame(animate);

        // --- 9. Resize Handling ---
        handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

    } catch (e) {
        console.warn("Error initializing 3D Scene:", e);
        setIsSupported(false);
    }

    return cleanup;
  }, [isSupported]);

  if (!isSupported) {
     return <div className="absolute inset-0 bg-white" />;
  }

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
};

/**
 * GeometricLuxuryScene
 * 
 * Kept as is for other sections.
 */
export const GeometricLuxuryScene: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      let width = canvas.width = canvas.clientWidth;
      let height = canvas.height = canvas.clientHeight;
  
      const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
      const nodeCount = 30;
      const connectionDistance = 150;
  
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
  
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Removed background fill to allow transparency
        // ctx.fillStyle = '#1B365D';
        // ctx.fillRect(0, 0, width, height);
  
        // Draw connections
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.3)'; // Increased opacity slightly for visibility on dark bg
        ctx.lineWidth = 1;
  
        for (let i = 0; i < nodeCount; i++) {
          const nodeA = nodes[i];
          nodeA.x += nodeA.vx;
          nodeA.y += nodeA.vy;
  
          // Bounce
          if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
          if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;
  
          // Draw Nodes
          ctx.fillStyle = '#C5A059';
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, 2, 0, Math.PI * 2);
          ctx.fill();
  
          for (let j = i + 1; j < nodeCount; j++) {
            const nodeB = nodes[j];
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
  
            if (dist < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }
        }
  
        requestAnimationFrame(animate);
      };
  
      const animationId = requestAnimationFrame(animate);
  
      const handleResize = () => {
        if(canvas) {
            width = canvas.width = canvas.clientWidth;
            height = canvas.height = canvas.clientHeight;
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationId);
      };
    }, []);
  
    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
};