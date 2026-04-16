import * as THREE from 'three';

function Box() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const box = new THREE.Mesh(geometry, material);
  box.userData = {
    clicked: false
  };

  return box;
}

export default Box;