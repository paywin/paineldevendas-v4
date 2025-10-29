document.addEventListener('DOMContentLoaded', function() {
            const pages = document.querySelectorAll('.page');
            const categoryTitle = document.getElementById('current-category');
            const pageOrder = ['almocos', 'almocinhos', 'executivos', 'pratos-dia'];
            const categoryNames = {
                'almocos': 'Almoços',
                'almocinhos': 'Almocinhos',
                'executivos': 'Executivos',
                        'pratos-dia': 'Pratos do Dia'
            };
            let currentPageIndex = 0;
            let currentIndex = 0;
            let interval;

            // Função para ajustar o layout baseado na orientação
            function adjustLayout() {
                const content = document.querySelector('.content');
                if (window.innerWidth <= 768) {
                    document.body.style.flexDirection = 'column';
                } else {
                    document.body.style.flexDirection = 'row';
                }
            }

            // Função para mudar de página
            function changePage(pageIndex) {
                const pageId = pageOrder[pageIndex];
                
                // Atualiza as páginas
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === pageId) {
                        page.classList.add('active');
                    }
                });

                // Atualiza o título da categoria
                categoryTitle.textContent = categoryNames[pageId];

                currentPageIndex = pageIndex;
                currentIndex = 0;
                
                // Reinicia a seleção automática
                restartAutoSelection();
            }

            // Função para selecionar um item na página atual
            function selectItem(index) {
                const currentPageId = pageOrder[currentPageIndex];
                const currentPageElement = document.getElementById(currentPageId);
                const menuItems = currentPageElement.querySelectorAll('.menu-item');
                const foodImages = currentPageElement.querySelectorAll('.food-image');
                
                // Remove a seleção de todos os itens
                menuItems.forEach(item => item.classList.remove('selected'));
                
                // Esconde todas as imagens
                foodImages.forEach(img => img.classList.add('hidden'));
                
                // Seleciona o item atual
                if (menuItems[index]) {
                    menuItems[index].classList.add('selected');
                    
                    // Mostra a imagem correspondente
                    const imageId = menuItems[index].getAttribute('data-image');
                    const correspondingImage = document.getElementById(imageId);
                    if (correspondingImage) {
                        correspondingImage.classList.remove('hidden');
                    }
                }
                
                currentIndex = index;
            }

            // Função para avançar para o próximo item
            function nextItem() {
                const currentPageId = pageOrder[currentPageIndex];
                const currentPageElement = document.getElementById(currentPageId);
                const menuItems = currentPageElement.querySelectorAll('.menu-item');
                
                if (menuItems.length > 0) {
                    // Se chegou no último item, muda de página
                    if (currentIndex >= menuItems.length - 1) {
                        // Vai para a próxima página
                        currentPageIndex = (currentPageIndex + 1) % pageOrder.length;
                        changePage(currentPageIndex);
                    } else {
                        // Avança para o próximo item na mesma página
                        currentIndex++;
                        selectItem(currentIndex);
                    }
                }
            }

            // Inicia a seleção automática
            function startAutoSelection() {
                interval = setInterval(nextItem, 2000); // 5 segundos
            }

            // Para a seleção automática
            function stopAutoSelection() {
                clearInterval(interval);
            }

            // Reinicia a seleção automática
            function restartAutoSelection() {
                stopAutoSelection();
                selectItem(0); // Seleciona o primeiro item
                startAutoSelection();
            }

            // Event listeners para responsividade
            window.addEventListener('resize', adjustLayout);
            window.addEventListener('orientationchange', adjustLayout);

            // Inicia a seleção automática na primeira página
            adjustLayout(); // Ajusta o layout inicial
            restartAutoSelection();
        });

function updateQuantity() {
    // Contar o número de divs com a classe 'itemAlm, itemAlmch, itemPrtDia, itemExec'
    const itemAlm = document.querySelectorAll('.itemAlm.mostrar').length;
    const itemAlmch = document.querySelectorAll('.itemAlmch.mostrar').length;
    const itemExec = document.querySelectorAll('.itemExec.mostrar').length;
    console.log(itemAlm);
    console.log(itemAlmch);
    console.log(itemExec);
    // Encontrar a div com a classe 'almoco, almocinho, executivo'
    const almocoDiv = document.querySelector('.almoco');
    const almocinhoDiv = document.querySelector('.almocinho');
    const executivoDiv = document.querySelector('.executivo');
    // Encontrar a div com a classe 'almoco, almocinho, executivo'
    const itemAlmDivs = document.querySelectorAll('.carrosselAlm');
    const itemAlmchDivs = document.querySelectorAll('.carrosselAlmch');
    const itemExecDivs = document.querySelectorAll('.carrosselExec');
    console.log(almocoDiv);
    console.log(almocinhoDiv);
    console.log(executivoDiv);
    console.log(itemAlmDivs);
    console.log(itemAlmchDivs);
    console.log(itemExecDivs);

    // Atualizar cada div com a classe 'carrossel'
    itemAlmDivs.forEach(itemAlmDiv => {
      // Atualizar a variável CSS --quantity no estilo da div 'carrossel'
      almocoDiv.style.setProperty('--quantity', itemAlm);
      // Adicionar ou remover a classe 'animate' com base no itemCount
      if (itemAlm <= 4) {
      itemAlmDiv.classList.remove('animate');
      } else {
          itemAlmDiv.classList.add('animate');
      } 
    });
    
    // Atualizar cada div com a classe 'itemAlmch'
    itemAlmchDivs.forEach(itemAlmchDiv => {
      // Atualizar a variável CSS --quantity no estilo da div 'container'
      almocinhoDiv.style.setProperty('--quantity', itemAlmch);
      // Adicionar ou remover a classe 'animate' com base no itemCount
      if (itemAlmch <= 4) {
      itemAlmchDiv.classList.remove('animate');
      } else {
          itemAlmchDiv.classList.add('animate');
      }
    });

    // Atualizar cada div com a classe 'container'
    itemExecDivs.forEach(itemExecDiv => {
      // Atualizar a variável CSS --quantity no estilo da div 'container'
      executivoDiv.style.setProperty('--quantity', itemExec);
      // Adicionar ou remover a classe 'animate' com base no itemCount
      if (itemExec <= 4) {
      itemExecDiv.classList.remove('animate');
      } else {
          itemExecDiv.classList.add('animate');
      }
    });
}

// Chamar a função quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', updateQuantity);



// Função para remover o itens do painel
function iniciaRemover(modalID) {
    const modal = document.getElementById(modalID);
    modal.classList.add('remover'),
    modal.classList.replace('menu-item', 'menu-ite'),
    modal.classList.replace('food-image', 'food-imag');
}
function paraRemover(modalIDD) {
    const modal = document.getElementById(modalIDD);
    modal.classList.remove('remover')
    modal.classList.replace('menu-ite', 'menu-item'),
    modal.classList.replace('food-imag', 'food-image');
}
// set chekcboxes using localstorage onload page
var check30statusStorage = localStorage.getItem("check30");
var check31statusStorage = localStorage.getItem("check31");
var check32statusStorage = localStorage.getItem("check32");
var check33statusStorage = localStorage.getItem("check33");
var check34statusStorage = localStorage.getItem("check34");
var check35statusStorage = localStorage.getItem("check35");
var check36statusStorage = localStorage.getItem("check36");
var check37statusStorage = localStorage.getItem("check37");
var check38statusStorage = localStorage.getItem("check38");
var check39statusStorage = localStorage.getItem("check39");
var check40statusStorage = localStorage.getItem("check40");
var check41statusStorage = localStorage.getItem("check41");
var check42statusStorage = localStorage.getItem("check42");
var check43statusStorage = localStorage.getItem("check43");
var check44statusStorage = localStorage.getItem("check44");
var check45statusStorage = localStorage.getItem("check45");
var check46statusStorage = localStorage.getItem("check46");
var check47statusStorage = localStorage.getItem("check47");
var check48statusStorage = localStorage.getItem("check48");
var check49statusStorage = localStorage.getItem("check49");
var check50statusStorage = localStorage.getItem("check50");
var check51statusStorage = localStorage.getItem("check51");
var check52statusStorage = localStorage.getItem("check52");
var check53statusStorage = localStorage.getItem("check53");
var check54statusStorage = localStorage.getItem("check54");
var check55statusStorage = localStorage.getItem("check55");
var check56statusStorage = localStorage.getItem("check56");


if (check30statusStorage == 'false') {
    iniciaRemover('lasanha'), 
    iniciaRemover('imgLasanha');
} else {
    paraRemover('lasanha'), 
    paraRemover('imgLasanha');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check30') {
                console.log('atualizado')
                window.location.reload()
            }
        });

if (check31statusStorage == 'true') {
    iniciaRemover('almFigAceb');
} else {
    paraRemover('almFigAceb');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check31') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check32statusStorage == 'true') {
    iniciaRemover('almGaliGuis');
} else {
    paraRemover('almGaliGuis');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check32') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check33statusStorage == 'true') {
    iniciaRemover('almGaliAssad');
} else {
    paraRemover('almGaliAssad');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check33') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check34statusStorage == 'true') {
    iniciaRemover('almCarnGuis');
} else {
    paraRemover('almCarnGuis');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check34') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check35statusStorage == 'true') {
    iniciaRemover('almBifeAceb');
} else {
    paraRemover('almBifeAceb');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check35') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check36statusStorage == 'true') {
    iniciaRemover('almBistAceb');
} else {
    paraRemover('almBistAceb');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check36') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check37statusStorage == 'true') {
    iniciaRemover('almchToscFrango');
} else {
    paraRemover('almchToscFrango');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check37') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check38statusStorage == 'true') {
    iniciaRemover('almchGaliGuisa');
} else {
    paraRemover('almchGaliGuisa');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check38') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check39statusStorage == 'true') {
    iniciaRemover('almchFigaAceb');
} else {
    paraRemover('almchFigaAceb');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check39') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check40statusStorage == 'true') {
    iniciaRemover('almchGaliAssad');
} else {
    paraRemover('almchGaliAssad');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check40') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check41statusStorage == 'true') {
    iniciaRemover('almchCarnGuisa');
} else {
    paraRemover('almchCarnGuisa');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check41') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check42statusStorage == 'true') {
    iniciaRemover('prtDiaArrumCharque');
} else {
    paraRemover('prtDiaArrumCharque');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check42') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check43statusStorage == 'true') {
    iniciaRemover('prtDiaArrumSol');
} else {
    paraRemover('prtDiaArrumSol');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check43') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check44statusStorage == 'true') {
    iniciaRemover('prtDiaParmFrango');
} else {
    paraRemover('prtDiaParmFrango');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check44') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check45statusStorage == 'true') {
    iniciaRemover('prtDiaCumpim');
} else {
    paraRemover('prtDiaCumpim');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check45') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check46statusStorage == 'true') {
    iniciaRemover('prtDiaStrogFrango');
} else {
    paraRemover('prtDiaStrogFrango');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check46') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check47statusStorage == 'true') {
    iniciaRemover('prtDiaLasaFrango');
} else {
    paraRemover('prtDiaLasaFrango');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check47') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check48statusStorage == 'true') {
    iniciaRemover('prtDiaLasaCarne');
} else {
    paraRemover('prtDiaLasaCarne');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check48') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check49statusStorage == 'true') {
    iniciaRemover('prtDiaPeixFrito');
} else {
    paraRemover('prtDiaPeixFrito');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check49') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check50statusStorage == 'true') {
    iniciaRemover('prtDiaPeixCoco');
} else {
    paraRemover('prtDiaPeixCoco');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check50') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check51statusStorage == 'true') {
    iniciaRemover('prtDiaMaoVaca');
} else {
    paraRemover('prtDiaMaoVaca');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check51') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check52statusStorage == 'true') {
    iniciaRemover('execCarnSol');
} else {
    paraRemover('execCarnSol');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check52') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check53statusStorage == 'true'){
    iniciaRemover('execPicPorco');
}else{
    paraRemover('execPicPorco');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check53') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check54statusStorage == 'true'){
    iniciaRemover('execMaminha');
}else{
    paraRemover('execMaminha');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check54') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check55statusStorage == 'true'){
    iniciaRemover('execPicBoi');
}else{
    paraRemover('execPicBoi');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check55') {
                console.log('atualizado')
                window.location.reload()
            }
        });


if (check56statusStorage == 'true'){
    iniciaRemover('execFilMig');
}else{
    paraRemover('execFilMig');
}
window.addEventListener('storage', function(event) {
            if (event.key === 'check56') {
                console.log('atualizado')
                window.location.reload()
            }
        });