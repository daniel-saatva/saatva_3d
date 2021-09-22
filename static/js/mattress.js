let mattress;
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const gltfLoader = new THREE.GLTFLoader();

function init() {
    gltfLoader.load('/mattress_nologo.gltf', function ( gltf ) {
        mattress = gltf.scene;
        scene.add( mattress );
    }, undefined, function ( error ) {
        console.error( error );
    });

    const light1 = new THREE.AmbientLight( 0xffffff, 1 );
    scene.add( light1 );
    const light2 = new THREE.PointLight( 0xffffff, 0.5 );
    scene.add( light2 );

    const imageSlider = document.getElementById('image-slider');
    imageSlider.innerHTML = "";
    renderer.setClearColor( 0xffffff );
    renderer.setSize(imageSlider.offsetWidth, imageSlider.offsetHeight );
    imageSlider.appendChild( renderer.domElement );
    THREE.OrbitControls( camera, renderer.domElement );

    camera.position.z = 20;
    camera.position.y = 3;

    animate();
}

const animate = function () {
    requestAnimationFrame( animate );
    // mattress.rotation.y += 0.01;
    renderer.render( scene, camera );
};

window.onload = init
