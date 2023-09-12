// Feito por Gabriel Gama | Z
// Versão 1.2.0

const $URL =
    "https://yttwo.netlify.app/y/"
    // "http://127.0.0.1:5500/y/"

const yt2css = document.createElement("link")
yt2css.href = $URL + "yttwo.css"
yt2css.rel = "stylesheet"
yt2css.id = "yt2css"
document.head.appendChild(yt2css)

const interactjs = document.createElement("script")
interactjs.src = "https://unpkg.com/interactjs/dist/interact.min.js"
document.body.insertBefore(interactjs, document.getElementById("yt2script"))

function Yttwo(v) {
    // definição dos elementos:


    // retira o id do video:
    function id_v(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    // ajusta o tamanho de acordo com a tela
    function resize() {
        function ow(id) { return document.querySelector(id).offsetWidth }

        let cl = ow("#columns #secondary") + (ow("#columns #primary") + 24)
        let body = document.body.clientWidth - cl
        let w = ow("#columns #secondary") + (body / 2)
        w = w - 24

        const yttframe = document.getElementById("yttwoframe")
        yttframe.style.width = `${w}px`
        yttframe.style.height = `${((w / 100) * 56.25)}px`

        const ytt = document.getElementById("yttwo")
        ytt.style.width = `${w}px`

        const yttbottom_search = document.getElementById("yt2search")
        yttbottom_search.style.maxWidth = `${ow("#secondary-inner") - 15}px`

        document.getElementById("yt2menu").style.width = `${ow("#secondary-inner") - 90}px`
    };

    // iframe
    const yttwo = document.createElement("div")
    yttwo.id = "yttwo"

    yttwo.innerHTML = `
            <div class="yt2-iframe" id="yt2iframe"><div class="yt2-iframe__topbar">yttwo</div><iframe id="yttwoframe" src="" title="Yt2 Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
            <div class="yt2-bottom">
                <div class="yt2-search" id="yt2search">
                    <input type="text" class="ytd-searchbox" placeholder="https://www.youtube.com/watch?v=${v}" id="yttwoSearch">
                    <button type="submit" id="yttwoBtn">
                        <i class="yt2i-search"></i>
                    </button>
                </div>
                <div class="yt2-settings" id="yt2settings">
                    <button id="yttwoSettings">
                        <i class="yt2i-settings"></i>
                    </button>
                    <div id="yt2menu" style="display: none">
                        <p> <i class="yt2i-minify"></i>Minimizar</p>
                        <p> <i class="yt2i-miniplayer"></i>Miniplayer (beta)</p>
                        <p> <i class="yt2i-reload"></i>Recarregar</p>
                        <p> <i class="yt2i-resize"></i>Reajustar vídeo</p>
                    </div>
                </div>
            </div>
            `

    // função de aplicação ao DOM (iframe / menu):
    async function y() {
        try {
            document.querySelector("#columns #secondary").insertBefore(yttwo, document.querySelector("#columns #secondary").children[0])
            return true
        } catch (e) {
            return false
        }
    }

    y().then((e) => {
        if (e == true) {

            ((z) => {
                document.getElementById("yttwoframe").src = `https://www.youtube.com/embed/${v}`
            })()

            // Pesquisar
            function yttbtn(e) {
                e.preventDefault()
                const $s = document.getElementById("yttwoSearch")
                const $id_v = id_v($s.value)

                document.getElementById("yttwoframe").src = "https://www.youtube.com/embed/" + $id_v
                $s.setAttribute("placeholder", `https://www.youtube.com/watch?v=${id_v($s.value)}`)
            }

            document.getElementById("yttwoBtn").addEventListener("click", yttbtn)
            document.getElementById("yttwoSearch").addEventListener("focus", (e) => {
                document.getElementById("yttwoSearch").addEventListener("keypress", (f) => {
                    if (f.key == "Enter") yttbtn(e);
                })
            })
            document.getElementById("yttwoSettings").addEventListener("click", () => {
                if (document.getElementById("yt2menu").style.display === "none") {
                    document.getElementById("yt2menu").style.display = "block"
                    document.getElementById("yt2search").style.opacity = '0.5'
                } else {
                    document.getElementById("yt2menu").style.display = "none"
                    document.getElementById("yt2search").style.opacity = '1'
                }
            })

            resize(); document.body.onresize = resize;
            function resizefullscreen() {
                const time = () => {
                    resize()
                    setTimeout(() => {
                        resize()
                        setTimeout(() => {
                            resize
                        }, 1500)
                    }, 500)
                }

                document.querySelector(".ytp-fullscreen-button").addEventListener("click", () => {
                    time()
                })
                document.addEventListener("keydown", (e) => {
                    if (e.key == "f") {
                        time()
                    }
                })
            };
            resizefullscreen();

            [...document.querySelectorAll('#yt2menu p')].map(e => {
                e.addEventListener("click", (z) => {
                    switch (e.children[0].className.replace(/yt2i-/g, '')) {
                        case "minify":
                            document.getElementById("yttwoframe").classList.add("minify")
                            e.querySelector("i").classList.replace("yt2i-minify", "yt2i-maxify")
                            e.innerHTML = e.innerHTML.replace(e.textContent.trim(), "Maximizar")
                            break

                        case "maxify":
                            document.getElementById("yttwoframe").classList.remove("minify")
                            e.querySelector("i").classList.replace("yt2i-maxify", "yt2i-minify")
                            e.innerHTML = e.innerHTML.replace(e.textContent.trim(), "Minimizar")
                            break

                        case "resize":
                            resize()
                            break

                        case "miniplayer":
                            const w = document.getElementById("yttwoframe").offsetWidth
                            const h = document.getElementById("yttwoframe").offsetHeight

                            e.querySelector("i").classList.replace("yt2i-miniplayer", "yt2i-defaultplayer")

                            document.getElementById("yt2iframe").classList.add("miniplayer")
                            document.getElementById("yttwoframe").classList.add("miniplayer-iframe")

                            document.getElementById("yt2iframe").style.height = `${h / 1.5}px`
                            document.getElementById("yt2iframe").style.width = `${w / 1.5}px`

                            console.log((h / 1.5 + 12), w / 1.5)

                            const m = document.createElement("div")
                            m.className = "yt2-view-miniplayer"
                            document.body.insertBefore(m, document.querySelector("ytd-app"))

                            function miniplayer(a) {

                                function newinteract() {
                                    interact('.miniplayer')
                                        .draggable({
                                            modifiers: [
                                                interact.modifiers.restrictRect({
                                                    restriction: document.querySelector(".yt2-view-miniplayer"),
                                                })
                                            ],
                                            listeners: {
                                                start: (e) => {
                                                    document.body.style.overflow = "hidden"
                                                },
                                                move: dragMoveListener,
                                                end: () => {
                                                    document.body.style.removeProperty('overflow');
                                                }
                                            }
                                        })
                                        .resizable({
                                            manualStart: false,
                                            edges: {
                                                right: true, bottom: true, left: true
                                            },
                                            listeners: {
                                                move(event) {
                                                    var target = event.target
                                                    var x = (parseFloat(target.getAttribute('data-x')) || 0)
                                                    var y = (parseFloat(target.getAttribute('data-y')) || 0)

                                                    target.style.width = event.rect.width + 'px'
                                                    target.style.height = event.rect.height + 'px'

                                                    x += event.deltaRect.left
                                                    y += event.deltaRect.top

                                                    target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                                                    target.setAttribute('data-x', x)
                                                    target.setAttribute('data-y', y)
                                                }
                                            },
                                            modifiers: [
                                                interact.modifiers.restrictEdges({
                                                    outer: 'parent'
                                                }),

                                                interact.modifiers.restrictSize({
                                                    min: { width: w / 1.8, height: h / 1.8 },
                                                    max: { width: w * 2, height: h * 2 }
                                                }),

                                                interact.modifiers.aspectRatio({
                                                    ratio: 1.78,
                                                })
                                            ],

                                            inertia: true
                                        })

                                    function dragMoveListener(event) {

                                        var target = event.target
                                        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                                        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                                        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

                                        target.setAttribute('data-x', x)
                                        target.setAttribute('data-y', y)
                                    }
                                    window.dragMoveListener = dragMoveListener
                                }

                                newinteract(); window.onresize = newinteract()
                            }

                            miniplayer(document.getElementById("yttwoframe"))
                            break
                        case "defaultplayer":
                            e.querySelector("i").classList.replace("yt2i-defaultplayer", "yt2i-miniplayer")
                            const yt2iframe = document.getElementById("yt2iframe")

                            yt2iframe.classList.remove("miniplayer")
                            yt2iframe.style.removeProperty('width')
                            yt2iframe.style.removeProperty('height')
                            yt2iframe.style.removeProperty('transform')

                            document.querySelector("#yttwoframe").classList.remove("miniplayer-iframe")
                            document.body.removeChild(document.querySelector(".yt2-view-miniplayer"))

                            resize()
                            break

                        case "reload":
                            const yt2 = document.querySelector("#yttwo")
                            yt2.parentElement.removeChild(yt2)
                            setTimeout(() => {
                                Yttwo(v)
                            }, 800)
                    }
                })
            })
        } else {
            alert("Erro no yttwo! Atualize a página e tente novamente!")
        }
    })
}