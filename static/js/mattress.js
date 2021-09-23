let scene, camera, gltfLoader, mattress;
const renderer = new THREE.WebGLRenderer();

function init(mattress_model = '/mattress_nologo.gltf') {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    gltfLoader = new THREE.GLTFLoader();

    gltfLoader.load(mattress_model, function ( gltf ) {
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
    //mattress.rotation.y += 0.01;
    renderer.render( scene, camera );
};

const size_ul = document.getElementById('loom_size_select');

size_ul.addEventListener('click', ()=>{
    const selected_size = document.querySelector('.is-selected');
    let size_value = selected_size.getAttribute('value');
    size_value == '7060-3/3' ? init('/mattress_nologo.gltf') : init('/mattress_twin_nologo.gltf');
});

window.onload = init()
