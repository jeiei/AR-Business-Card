import {CSS3DObject} from "./../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js"
const THREE = window.MINDAR.IMAGE.THREE

//import {loadVideo} from "../../libs/loader.js"



const createYtPlayer = () => {
    return new Promise((resolve, reject) => {
        let tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        let firstScriptTag = document.querySelectorAll("script")[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

        const onYouTubeIframeAPIReady = () => {
            const player = new YT.Player("player", {
                videoId: "9-tfsz0bm7o", // this is your video M7lc1UVf-VE
                events: {
                    onReady: () => {
                        resolve(player)
                    }
                }
            })
        }
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
    })
}




document.addEventListener("DOMContentLoaded", () =>{ 
    async function start() {
        const player = await createYtPlayer()
        const mindARThreejs = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./assets/targets/flower.mind"
        })
        const { renderer, cssRenderer, scene, cssScene, camera } = mindARThreejs
        const div = new CSS3DObject(document.querySelector("#ar-example"))
        //const video = await loadVideo("../assets/video/windmill.mp4")
        //const texture = new THREE.VideoTexture(video)
        //const material = new THREE.MeshBasicMaterial({map: texture})
        //const geometry = new THREE.PlaneGeometry(1, 720 / 1280)
        //const plane = new THREE.Mesh(geometry, material)
        //plane.position.y = 0.8
        //div.position.y = 5
        const anchor = mindARThreejs.addCSSAnchor(0)
        anchor.group.add(div)

        anchor.onTargetFound = () => {
            player.playVideo()
        }

        anchor.onTargetLost = () => {
            player.pauseVideo()
        }

        
        // anchor.onTargetFound = () => {
        //     video.play()
        // }
        // anchor.onTargetLost = () => {
        //     video.pause()
        // }


        await mindARThreejs.start()
        renderer.setAnimationLoop(render)
        function render() {
            renderer.render(scene, camera)
        }
    }
    start()
})
