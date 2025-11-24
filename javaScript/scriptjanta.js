document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.page');
    const categoryTitle = document.getElementById('current-category');
    const pageOrder = ['Janta-cuscuz', 'janta-inhame', 'janta-macaxeira', 'sopas-tradicionais', 'sopas-cremosas'];
    const categoryNames = {
        'Janta-cuscuz': 'Janta - Cuscuz',
        'janta-inhame': 'Janta - Inhame', 
        'janta-macaxeira': 'Janta - Macaxeira',
        'sopas-tradicionais': 'Sopas Tradicionais',
        'sopas-cremosas': 'Sopas Cremosas'
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
        interval = setInterval(nextItem, 2000); // 2 segundos
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
    // Contar apenas os itens que estão visíveis (sem 'remover')
    const itemCuscuz = document.querySelectorAll('#Janta-cuscuz .menu-item:not(.remover)').length;
    const itemInhame = document.querySelectorAll('#janta-inhame .menu-item:not(.remover)').length;
    const itemMacaxeira = document.querySelectorAll('#janta-macaxeira .menu-item:not(.remover)').length;
    const itemSopasTrad = document.querySelectorAll('#sopas-tradicionais .menu-item:not(.remover)').length;
    const itemSopasCrem = document.querySelectorAll('#sopas-cremosas .menu-item:not(.remover)').length;
    
    console.log('Cuscuz:', itemCuscuz);
    console.log('Inhame:', itemInhame);
    console.log('Macaxeira:', itemMacaxeira);
    console.log('Sopas Trad:', itemSopasTrad);
    console.log('Sopas Crem:', itemSopasCrem);
}

// Chamar a função quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', updateQuantity);

// Função para remover os itens do painel
function iniciaRemover(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('remover');
        if (modal.classList.contains('menu-item')) {
            modal.classList.replace('menu-item', 'menu-ite');
        }
        if (modal.classList.contains('food-image')) {
            modal.classList.replace('food-image', 'food-imag');
        }
        
        // Atualiza as quantidades após remover um item
        setTimeout(updateQuantity, 100);
        // Força uma atualização do carrossel
        setTimeout(() => {
            window.dispatchEvent(new Event('storage'));
        }, 150);
    }
}

function paraRemover(modalIDD) {
    const modal = document.getElementById(modalIDD);
    if (modal) {
        modal.classList.remove('remover');
        if (modal.classList.contains('menu-ite')) {
            modal.classList.replace('menu-ite', 'menu-item');
        }
        if (modal.classList.contains('food-imag')) {
            modal.classList.replace('food-imag', 'food-image');
        }
        
        // Atualiza as quantidades após mostrar um item
        setTimeout(updateQuantity, 100);
        // Força uma atualização do carrossel
        setTimeout(() => {
            window.dispatchEvent(new Event('storage'));
        }, 150);
    }
}

// set chekcboxes using localstorage onload page
// Verificar e atualizar os status dos checks baseados no localStorage
// CUSCUZ
var check60statusStorage = localStorage.getItem("check60");
var check61statusStorage = localStorage.getItem("check61");
var check62statusStorage = localStorage.getItem("check62");
var check63statusStorage = localStorage.getItem("check63");
var check64statusStorage = localStorage.getItem("check64");
var check65statusStorage = localStorage.getItem("check65");

// INHAME
var check66statusStorage = localStorage.getItem("check66");
var check67statusStorage = localStorage.getItem("check67");
var check68statusStorage = localStorage.getItem("check68");
var check69statusStorage = localStorage.getItem("check69");
var check70statusStorage = localStorage.getItem("check70");
var check71statusStorage = localStorage.getItem("check71");

// MACAXEIRA
var check72statusStorage = localStorage.getItem("check72");
var check73statusStorage = localStorage.getItem("check73");
var check74statusStorage = localStorage.getItem("check74");
var check75statusStorage = localStorage.getItem("check75");
var check76statusStorage = localStorage.getItem("check76");
var check77statusStorage = localStorage.getItem("check77");

// SOPAS TRADICIONAIS
var check78statusStorage = localStorage.getItem("check78");
var check79statusStorage = localStorage.getItem("check79");
var check80statusStorage = localStorage.getItem("check80");

// SOPAS CREMOSAS
var check81statusStorage = localStorage.getItem("check81");
var check82statusStorage = localStorage.getItem("check82");
var check83statusStorage = localStorage.getItem("check83");

// ========== CUSCUZ ==========

// Check 60 - Cuscuz com Carne Guisada
if (check60statusStorage == 'false') {
    iniciaRemover('imgCuscuzCarne');
    // O item de menu será identificado pelo data-image
    document.querySelectorAll('[data-image="imgCuscuzCarne"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCuscuzCarne');
    document.querySelectorAll('[data-image="imgCuscuzCarne"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check60') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 61 - Cuscuz com Galinha Guisada
if (check61statusStorage == 'false') {
    iniciaRemover('imgCuscuzGalinhaG');
    document.querySelectorAll('[data-image="imgCuscuzGalinhaG"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCuscuzGalinhaG');
    document.querySelectorAll('[data-image="imgCuscuzGalinhaG"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check61') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 62 - Cuscuz com Charque
if (check62statusStorage == 'false') {
    iniciaRemover('imgCuscuzCharque');
    document.querySelectorAll('[data-image="imgCuscuzCharque"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCuscuzCharque');
    document.querySelectorAll('[data-image="imgCuscuzCharque"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check62') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 63 - Cuscuz com Galinha Assada
if (check63statusStorage == 'false') {
    iniciaRemover('imgCuscuzGalinhaA');
    document.querySelectorAll('[data-image="imgCuscuzGalinhaA"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCuscuzGalinhaA');
    document.querySelectorAll('[data-image="imgCuscuzGalinhaA"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check63') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 64 - Cuscuz com Calabresa
if (check64statusStorage == 'false') {
    iniciaRemover('imgCuscuzCalabresa');
    document.querySelectorAll('[data-image="imgCuscuzCalabresa"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCuscuzCalabresa');
    document.querySelectorAll('[data-image="imgCuscuzCalabresa"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check64') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 65 - Cuscuz com Carne de Sol
if (check65statusStorage == 'false') {
    iniciaRemover('imgCuscuzSol');
    document.querySelectorAll('[data-image="imgCuscuzSol"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCuscuzSol');
    document.querySelectorAll('[data-image="imgCuscuzSol"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check65') {
        console.log('atualizado')
        window.location.reload()
    }
});

// ========== INHAME ==========

// Check 66 - Inhame com Carne Guisada
if (check66statusStorage == 'false') {
    iniciaRemover('imgInhameCarne');
    document.querySelectorAll('[data-image="imgInhameCarne"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgInhameCarne');
    document.querySelectorAll('[data-image="imgInhameCarne"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check66') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 67 - Inhame com Galinha Guisada
if (check67statusStorage == 'false') {
    iniciaRemover('imgInhameGalinhaG');
    document.querySelectorAll('[data-image="imgInhameGalinhaG"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgInhameGalinhaG');
    document.querySelectorAll('[data-image="imgInhameGalinhaG"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check67') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 68 - Inhame com Charque
if (check68statusStorage == 'false') {
    iniciaRemover('imgInhameCharque');
    document.querySelectorAll('[data-image="imgInhameCharque"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgInhameCharque');
    document.querySelectorAll('[data-image="imgInhameCharque"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check68') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 69 - Inhame com Galinha Assada
if (check69statusStorage == 'false') {
    iniciaRemover('imgInhameGalinhaA');
    document.querySelectorAll('[data-image="imgInhameGalinhaA"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgInhameGalinhaA');
    document.querySelectorAll('[data-image="imgInhameGalinhaA"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check69') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 70 - Inhame com Calabresa
if (check70statusStorage == 'false') {
    iniciaRemover('imgInhameCalabresa');
    document.querySelectorAll('[data-image="imgInhameCalabresa"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgInhameCalabresa');
    document.querySelectorAll('[data-image="imgInhameCalabresa"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check70') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 71 - Inhame com Carne de Sol
if (check71statusStorage == 'false') {
    iniciaRemover('imgInhameSol');
    document.querySelectorAll('[data-image="imgInhameSol"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgInhameSol');
    document.querySelectorAll('[data-image="imgInhameSol"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check71') {
        console.log('atualizado')
        window.location.reload()
    }
});

// ========== MACAXEIRA ==========

// Check 72 - Macaxeira com Carne Guisada
if (check72statusStorage == 'false') {
    iniciaRemover('imgMacaxeiraCarne');
    document.querySelectorAll('[data-image="imgMacaxeiraCarne"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgMacaxeiraCarne');
    document.querySelectorAll('[data-image="imgMacaxeiraCarne"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check72') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 73 - Macaxeira com Galinha Guisada
if (check73statusStorage == 'false') {
    iniciaRemover('imgMacaxeiraGalinhaG');
    document.querySelectorAll('[data-image="imgMacaxeiraGalinhaG"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgMacaxeiraGalinhaG');
    document.querySelectorAll('[data-image="imgMacaxeiraGalinhaG"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check73') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 74 - Macaxeira com Charque
if (check74statusStorage == 'false') {
    iniciaRemover('imgMacaxeiraCharque');
    document.querySelectorAll('[data-image="imgMacaxeiraCharque"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgMacaxeiraCharque');
    document.querySelectorAll('[data-image="imgMacaxeiraCharque"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check74') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 75 - Macaxeira com Galinha Assada
if (check75statusStorage == 'false') {
    iniciaRemover('imgMacaxeiraGalinhaA');
    document.querySelectorAll('[data-image="imgMacaxeiraGalinhaA"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgMacaxeiraGalinhaA');
    document.querySelectorAll('[data-image="imgMacaxeiraGalinhaA"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check75') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 76 - Macaxeira com Calabresa
if (check76statusStorage == 'false') {
    iniciaRemover('imgMacaxeiraCalabresa');
    document.querySelectorAll('[data-image="imgMacaxeiraCalabresa"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgMacaxeiraCalabresa');
    document.querySelectorAll('[data-image="imgMacaxeiraCalabresa"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check76') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 77 - Macaxeira com Carne de Sol
if (check77statusStorage == 'false') {
    iniciaRemover('imgMacaxeiraSol');
    document.querySelectorAll('[data-image="imgMacaxeiraSol"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgMacaxeiraSol');
    document.querySelectorAll('[data-image="imgMacaxeiraSol"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check77') {
        console.log('atualizado')
        window.location.reload()
    }
});

// ========== SOPAS TRADICIONAIS ==========

// Check 78 - Sopa de Carne
if (check78statusStorage == 'false') {
    iniciaRemover('imgSopaCarne');
    document.querySelectorAll('[data-image="imgSopaCarne"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgSopaCarne');
    document.querySelectorAll('[data-image="imgSopaCarne"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check78') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 79 - Canja
if (check79statusStorage == 'false') {
    iniciaRemover('imgSopaCanja');
    document.querySelectorAll('[data-image="imgSopaCanja"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgSopaCanja');
    document.querySelectorAll('[data-image="imgSopaCanja"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check79') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 80 - Sopa de Feijão
if (check80statusStorage == 'false') {
    iniciaRemover('imgSopaFeijao');
    document.querySelectorAll('[data-image="imgSopaFeijao"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgSopaFeijao');
    document.querySelectorAll('[data-image="imgSopaFeijao"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check80') {
        console.log('atualizado')
        window.location.reload()
    }
});

// ========== SOPAS CREMOSAS ==========

// Check 81 - Creme de Abóbora
if (check81statusStorage == 'false') {
    iniciaRemover('imgCremeAbobora');
    document.querySelectorAll('[data-image="imgCremeAbobora"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCremeAbobora');
    document.querySelectorAll('[data-image="imgCremeAbobora"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check81') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 82 - Creme de Macaxeira
if (check82statusStorage == 'false') {
    iniciaRemover('imgCremeMacaxeira');
    document.querySelectorAll('[data-image="imgCremeMacaxeira"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCremeMacaxeira');
    document.querySelectorAll('[data-image="imgCremeMacaxeira"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check82') {
        console.log('atualizado')
        window.location.reload()
    }
});

// Check 83 - Creme de Cebola
if (check83statusStorage == 'false') {
    iniciaRemover('imgCremeCebola');
    document.querySelectorAll('[data-image="imgCremeCebola"]').forEach(item => iniciaRemover(item.id));
} else {
    paraRemover('imgCremeCebola');
    document.querySelectorAll('[data-image="imgCremeCebola"]').forEach(item => paraRemover(item.id));
}
window.addEventListener('storage', function (event) {
    if (event.key === 'check83') {
        console.log('atualizado')
        window.location.reload()
    }
});