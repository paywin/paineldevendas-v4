document.addEventListener('DOMContentLoaded', function() {
            const pages = document.querySelectorAll('.page');
            const categoryTitle = document.getElementById('current-category');
            const pageOrder = ['almocos', 'sobremesas'];
            const categoryNames = {
                'almocos': 'Almoços',
                'sobremesas': 'Sobremesas'
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
                interval = setInterval(nextItem, 5000); // 5 segundos
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