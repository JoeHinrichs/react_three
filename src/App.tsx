import * as THREE from 'three';
import { useEffect, useRef } from "react";
import Box from './Box';
import './App.css'


function App() {

  {
    const ref = useRef<HTMLDivElement | null>(null);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    camera.position.z = 2;
    light.position.set(10, 10, 0);

    scene.add(light);
    scene.add(ambient);

    useEffect(() => {

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      function onClick(event: MouseEvent) {
        mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mousePos, camera);

        const intersects = raycaster.intersectObjects(scene.children, false);

        if (intersects.length > 0) {
          const clickedObject = intersects[0].object as THREE.Mesh;

          let material = new THREE.MeshStandardMaterial();
          material.color.set(0xff0000);
          clickedObject.userData = {
            clicked: !clickedObject.userData.clicked
          };
          clickedObject.material = material;
          clickedObject.scale.set(1.1, 1.1, 1.1);

        }
      }

      renderer.setSize(window.innerWidth, window.innerHeight);
      ref.current && ref.current.appendChild(renderer.domElement); //use ref to append the renderer's DOM element

      const box_A = Box();
      const box_B = Box();

      box_A.position.set(-0.75, 0, 0);
      box_B.position.set(0.75, 0, 0);

      scene.add(box_A);
      scene.add(box_B);

      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('click', onClick, false);


      var animate = function () {
        requestAnimationFrame(animate);
        box_A.rotation.x += 0.01;
        box_A.rotation.y += 0.01;
        box_B.rotation.x += 0.01;
        box_B.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();

    }, []);
    return (
      <div ref={ref}></div>
    );
  }
}

export default App
