let scene, camera, gltfLoader, mattress;
const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.shadowMap.enabled = true;

function init(mattress_model = "/mattress_solaire_nologo.gltf") {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  gltfLoader = new THREE.GLTFLoader();

  gltfLoader.load(
    mattress_model,
    function (gltf) {
      mattress = gltf.scene;

      mattress.traverse = n => {
        if(n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = true;

          if(n.material.map) n.material.map.anisotropy = 16;
        }
      }
      

      scene.add(mattress);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const light1 = new THREE.HemisphereLight(0xffeeb1, 0xffeebb, 3);
  scene.add( light1 );

  const light2 = new THREE.DirectionalLight(0xffffff, 3);
  light2.position.set(-15,15,10);
  light2.castShadow = true;
  scene.add(light2);

  const imageSlider = document.querySelector(".productImageSlider");

  imageSlider.innerHTML = "";

  renderer.setClearColor(0xffffff);
  renderer.setSize(imageSlider.offsetWidth, imageSlider.offsetHeight + 30);
  imageSlider.appendChild(renderer.domElement);
  THREE.OrbitControls(camera, renderer.domElement);

  camera.position.z = 20;
  camera.position.y = 3;

  animate();
}

const animate = function () {
  requestAnimationFrame(animate);
  //mattress.rotation.y += 0.01;
  renderer.render(scene, camera);
};

const dropdown = document.getElementById("loom_size_select");

dropdown.addEventListener("change", (event) => {
  let value = event.target.value;
  console.log("value", value);
  if(value === "queen") {
    init("/mattress_nologo.gltf");
  } else if(value === "solaire") {
    init("/mattress_solaire_nologo.gltf");
  } else if(value === "twin") {
      init("/mattress_twin_nologo.gltf");
  } else {
    init("/mattress.gltf");
  }
});

window.onload = init();
