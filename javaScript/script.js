document.addEventListener('DOMContentLoaded', function () {
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

    // Função auxiliar para verificar se uma página tem itens visíveis
    function pageHasVisibleItems(pageId) {
        const pageElement = document.getElementById(pageId);
        const visibleItems = pageElement.querySelectorAll('.menu-item:not(.remover)');
        return visibleItems.length > 0;
    }

    // Função para encontrar a próxima página com itens visíveis
    function findNextPageWithItems(startIndex) {
        let nextIndex = (startIndex + 1) % pageOrder.length;
        let attempts = 0;
        
        while (attempts < pageOrder.length) {
            if (pageHasVisibleItems(pageOrder[nextIndex])) {
                return nextIndex;
            }
            nextIndex = (nextIndex + 1) % pageOrder.length;
            attempts++;
        }
        
        return startIndex; // Retorna a página atual se nenhuma tiver itens
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

        // Verifica se a página atual tem itens visíveis
        const currentPageElement = document.getElementById(pageId);
        const visibleItems = currentPageElement.querySelectorAll('.menu-item:not(.remover)');
        
        // Se não há itens visíveis, avança para a próxima página automaticamente
        if (visibleItems.length === 0) {
            setTimeout(() => {
                const nextPageIndex = findNextPageWithItems(currentPageIndex);
                if (nextPageIndex !== currentPageIndex) {
                    changePage(nextPageIndex);
                }
            }, 100); // Pequeno delay para evitar loop infinito
            return;
        }

        // Reinicia a seleção automática
        restartAutoSelection();
    }

    // Função para selecionar um item na página atual
    function selectItem(index) {
        const currentPageId = pageOrder[currentPageIndex];
        const currentPageElement = document.getElementById(currentPageId);
        const menuItems = currentPageElement.querySelectorAll('.menu-item:not(.remover)'); // Só considera itens visíveis
        const foodImages = currentPageElement.querySelectorAll('.food-image:not(.remover)'); // Só considera imagens visíveis

        // Remove a seleção de todos os itens
        menuItems.forEach(item => item.classList.remove('selected'));

        // Esconde todas as imagens
        foodImages.forEach(img => img.classList.add('hidden'));

        // Seleciona o item atual apenas se existir
        if (menuItems[index]) {
            menuItems[index].classList.add('selected');

            // Mostra a imagem correspondente
            const imageId = menuItems[index].getAttribute('data-image');
            if (imageId) {
                const correspondingImage = document.getElementById(imageId);
                if (correspondingImage && !correspondingImage.classList.contains('remover')) {
                    correspondingImage.classList.remove('hidden');
                }
            }
        }

        currentIndex = index;
    }

    // Função para avançar para o próximo item
    function nextItem() {
        const currentPageId = pageOrder[currentPageIndex];
        const currentPageElement = document.getElementById(currentPageId);
        const menuItems = currentPageElement.querySelectorAll('.menu-item:not(.remover)'); // Só considera itens visíveis

        // Se não há itens visíveis na página atual, muda imediatamente para a próxima
        if (menuItems.length === 0) {
            const nextPageIndex = findNextPageWithItems(currentPageIndex);
            if (nextPageIndex !== currentPageIndex) {
                changePage(nextPageIndex);
            }
            return;
        }

        if (menuItems.length > 0) {
            // Se chegou no último item, muda de página
            if (currentIndex >= menuItems.length - 1) {
                // Vai para a próxima página
                const nextPageIndex = findNextPageWithItems(currentPageIndex);
                changePage(nextPageIndex);
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
        
        const currentPageId = pageOrder[currentPageIndex];
        const currentPageElement = document.getElementById(currentPageId);
        const visibleItems = currentPageElement.querySelectorAll('.menu-item:not(.remover)');
        
        // Só seleciona o primeiro item se houver itens visíveis
        if (visibleItems.length > 0) {
            selectItem(0);
            startAutoSelection();
        }
    }

    // Event listeners para responsividade
    window.addEventListener('resize', adjustLayout);
    window.addEventListener('orientationchange', adjustLayout);

    // Inicia a seleção automática na primeira página
    adjustLayout(); // Ajusta o layout inicial
    
    // Encontra a primeira página que tem itens visíveis
    let startPageIndex = 0;
    for (let i = 0; i < pageOrder.length; i++) {
        if (pageHasVisibleItems(pageOrder[i])) {
            startPageIndex = i;
            break;
        }
    }
    
    changePage(startPageIndex);
});

function updateQuantity() {
    // Contar apenas os itens que estão visíveis (com classe 'mostrar' e sem 'remover')
    const itemAlm = document.querySelectorAll('.itemAlm.mostrar:not(.remover)').length;
    const itemAlmch = document.querySelectorAll('.itemAlmch.mostrar:not(.remover)').length;
    const itemExec = document.querySelectorAll('.itemExec.mostrar:not(.remover)').length;
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
    
    // Atualiza as quantidades após remover um item
    setTimeout(updateQuantity, 100);
    // Força uma atualização do carrossel
    setTimeout(() => {
        window.dispatchEvent(new Event('storage'));
    }, 150);
}

function paraRemover(modalIDD) {
    const modal = document.getElementById(modalIDD);
    modal.classList.remove('remover')
    modal.classList.replace('menu-ite', 'menu-item'),
    modal.classList.replace('food-imag', 'food-image');
    
    // Atualiza as quantidades após mostrar um item
    setTimeout(updateQuantity, 100);
    // Força uma atualização do carrossel
    setTimeout(() => {
        window.dispatchEvent(new Event('storage'));
    }, 150);
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


// Check 30 - Toscana
if (check30statusStorage == 'false') {
    iniciaRemover('toscana'),
    iniciaRemover('imgToscana');
} else {
    paraRemover('toscana'),
    paraRemover('imgToscana');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check30') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 31 - Figado Acebolado
if (check31statusStorage == 'false') {
    iniciaRemover('figado'),
    iniciaRemover('imgFigado');
} else {
    paraRemover('figado'),
    paraRemover('imgFigado');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check31') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 32 - Galinha Guisada
if (check32statusStorage == 'false') {
    iniciaRemover('galinha'),
    iniciaRemover('imgGalinha');
} else {
    paraRemover('galinha'),
    paraRemover('imgGalinha');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check32') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 33 - Galinha Assada
if (check33statusStorage == 'false') {
    iniciaRemover('frango'),
    iniciaRemover('imgFrango');
} else {
    paraRemover('frango'),
    paraRemover('imgFrango');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check33') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 34 - Carne Guisada
if (check34statusStorage == 'false') {
    iniciaRemover('guisado'),
    iniciaRemover('imgGuisado');
} else {
    paraRemover('guisado'),
    paraRemover('imgGuisado');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check34') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 35 - Bife Acebolado
if (check35statusStorage == 'false') {
    iniciaRemover('bife'),
    iniciaRemover('imgBife');
} else {
    paraRemover('bife'),
    paraRemover('imgBife');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check35') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 36 - Toscana Eco.
if (check36statusStorage == 'false') {
    iniciaRemover('ecoToscana'),
    iniciaRemover('imgEcoToscana');
} else {
    paraRemover('ecoToscana'),
    paraRemover('imgEcoToscana');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check36') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 37 - Galinha Guis. Eco.
if (check37statusStorage == 'false') {
    iniciaRemover('ecoGalinha'),
    iniciaRemover('imgEcoGalinha');
} else {
    paraRemover('ecoGalinha'),
    paraRemover('imgEcoGalinha');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check37') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 38 - Figado Eco.
if (check38statusStorage == 'false') {
    iniciaRemover('ecoFigado'),
    iniciaRemover('imgEcoFigado');
} else {
    paraRemover('ecoFigado'),
    paraRemover('imgEcoFigado');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check38') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 39 - Galinha Ass. Eco.
if (check39statusStorage == 'false') {
    iniciaRemover('ecoFrango'),
    iniciaRemover('imgEcoFrango');
} else {
    paraRemover('ecoFrango'),
    paraRemover('imgEcoFrango');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check39') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 40 - Carne Guis. Eco.
if (check40statusStorage == 'false') {
    iniciaRemover('ecoCarne'),
    iniciaRemover('imgEcoGuisado');
} else {
    paraRemover('ecoCarne'),
    paraRemover('imgEcoGuisado');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check40') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 41 - Arrumadinho de Charque
if (check41statusStorage == 'false') {
    iniciaRemover('arrumadinhoCharque'),
    iniciaRemover('imgArrumChar');
} else {
    paraRemover('arrumadinhoCharque'),
    paraRemover('imgArrumChar');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check41') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 42 - Arrumadinho de Sol
if (check42statusStorage == 'false') {
    iniciaRemover('arrumadinhoSol'),
    iniciaRemover('imgArrumSol');
} else {
    paraRemover('arrumadinhoSol'),
    paraRemover('imgArrumSol');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check42') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 43 - Parmegiana de Frango
if (check43statusStorage == 'false') {
    iniciaRemover('parmegiana'),
    iniciaRemover('imgParmegiana');
} else {
    paraRemover('parmegiana'),
    paraRemover('imgParmegiana');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check43') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 44 - Strogonoff de Frango
if (check44statusStorage == 'false') {
    iniciaRemover('strogonoff'),
    iniciaRemover('imgStrogonoff');
} else {
    paraRemover('strogonoff'),
    paraRemover('imgStrogonoff');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check44') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 45 - Lasanha de Frango
if (check45statusStorage == 'false') {
    iniciaRemover('lasanhaFrango'),
    iniciaRemover('imgLasanFran');
} else {
    paraRemover('lasanhaFrango'),
    paraRemover('imgLasanFran');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check45') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 46 - Lasanha de Carne
if (check46statusStorage == 'false') {
    iniciaRemover('lasanhaCarne'),
    iniciaRemover('imgLasanCarn');
} else {
    paraRemover('lasanhaCarne'),
    paraRemover('imgLasanCarn');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check46') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 47 - Peixe Frito
if (check47statusStorage == 'false') {
    iniciaRemover('peixeFrito'),
    iniciaRemover('imgPeixeFrito');
} else {
    paraRemover('peixeFrito'),
    paraRemover('imgPeixeFrito');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check47') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 48 - Peixe ao Coco
if (check48statusStorage == 'false') {
    iniciaRemover('peixeCoco'),
    iniciaRemover('imgPeixeCoco');
} else {
    paraRemover('peixeCoco'),
    paraRemover('imgPeixeCoco');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check48') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 49 - Mão de Vaca
if (check49statusStorage == 'false') {
    iniciaRemover('maoDeVaca'),
    iniciaRemover('imgMaoVaca');
} else {
    paraRemover('maoDeVaca'),
    paraRemover('imgMaoVaca');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check49') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 50 - Maminha
if (check50statusStorage == 'false') {
    iniciaRemover('maminha'),
    iniciaRemover('imgMaminha');
} else {
    paraRemover('maminha'),
    paraRemover('imgMaminha');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check50') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 51 - Picanha
if (check51statusStorage == 'false') {
    iniciaRemover('picanha'),
    iniciaRemover('imgPicanha');
} else {
    paraRemover('picanha'),
    paraRemover('imgPicanha');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check51') {
        console.log('atualizado')
        window.location.reload()
    }
});

/* CHECKS COMENTADOS - ITENS QUE FALTAM NO HTML

// Check 52 - Carne de Sol (FALTA NO HTML)
if (check52statusStorage == 'false') {
    iniciaRemover('carneSol'),
    iniciaRemover('imgCarneSol');
} else {
    paraRemover('carneSol'),
    paraRemover('imgCarneSol');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check52') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 53 - Picanha de Porco (FALTA NO HTML)
if (check53statusStorage == 'false') {
    iniciaRemover('picanhaPorco'),
    iniciaRemover('imgPicanhaPorco');
} else {
    paraRemover('picanhaPorco'),
    paraRemover('imgPicanhaPorco');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check53') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 54 - Picanha de Boi (FALTA NO HTML)
if (check54statusStorage == 'false') {
    iniciaRemover('picanhaBoi'),
    iniciaRemover('imgPicanhaBoi');
} else {
    paraRemover('picanhaBoi'),
    paraRemover('imgPicanhaBoi');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check54') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 55 - Filé Mignon (FALTA NO HTML)
if (check55statusStorage == 'false') {
    iniciaRemover('fileMignon'),
    iniciaRemover('imgFileMignon');
} else {
    paraRemover('fileMignon'),
    paraRemover('imgFileMignon');
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check55') {
        console.log('atualizado')
        window.location.reload()
    }
});

*/