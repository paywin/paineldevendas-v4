function check30() {

				var check30status = document.getElementById("check30").checked;
				document.getElementById("check30").checked = check30status;
				localStorage.setItem('check30', check30status);
			}

			function check31() {

				var check31status = document.getElementById("check31").checked;
				document.getElementById("check31").checked = check31status;
				localStorage.setItem('check31', check31status);
			}

			function check32() {

				var check32status = document.getElementById("check32").checked;
				document.getElementById("check32").checked = check32status;
				localStorage.setItem('check32', check32status);
			}

			function check33() {

				var check33status = document.getElementById("check33").checked;
				document.getElementById("check33").checked = check33status;
				localStorage.setItem('check33', check33status);
			}

			function check34() {

				var check34status = document.getElementById("check34").checked;
				document.getElementById("check34").checked = check34status;
				localStorage.setItem('check34', check34status);
			}

			function check35() {

				var check35status = document.getElementById("check35").checked;
				document.getElementById("check35").checked = check35status;
				localStorage.setItem('check35', check35status);
			}

			function check36() {

				var check36status = document.getElementById("check36").checked;
				document.getElementById("check36").checked = check36status;
				localStorage.setItem('check36', check36status);
			}

			function check37() {

				var check37status = document.getElementById("check37").checked;
				document.getElementById("check37").checked = check37status;
				localStorage.setItem('check37', check37status);
			}

			function check38() {

				var check38status = document.getElementById("check38").checked;
				document.getElementById("check38").checked = check38status;
				localStorage.setItem('check38', check38status);
			}

			function check39() {

				var check39status = document.getElementById("check39").checked;
				document.getElementById("check39").checked = check39status;
				localStorage.setItem('check39', check39status);
			}

			function check40() {

				var check40status = document.getElementById("check40").checked;
				document.getElementById("check40").checked = check40status;
				localStorage.setItem('check40', check40status);
			}

			function check41() {

				var check41status = document.getElementById("check41").checked;
				document.getElementById("check41").checked = check41status;
				localStorage.setItem('check41', check41status);
			}

			function check42() {

				var check42status = document.getElementById("check42").checked;
				document.getElementById("check42").checked = check42status;
				localStorage.setItem('check42', check42status);
			}

			function check43() {

				var check43status = document.getElementById("check43").checked;
				document.getElementById("check43").checked = check43status;
				localStorage.setItem('check43', check43status);
			}

			function check44() {

				var check44status = document.getElementById("check44").checked;
				document.getElementById("check44").checked = check44status;
				localStorage.setItem('check44', check44status);
			}

			function check45() {

				var check45status = document.getElementById("check45").checked;
				document.getElementById("check45").checked = check45status;
				localStorage.setItem('check45', check45status);
			}

			function check46() {

				var check46status = document.getElementById("check46").checked;
				document.getElementById("check46").checked = check46status;
				localStorage.setItem('check46', check46status);
			}

			function check47() {

				var check47status = document.getElementById("check47").checked;
				document.getElementById("check47").checked = check47status;
				localStorage.setItem('check47', check47status);
			}

			function check48() {

				var check48status = document.getElementById("check48").checked;
				document.getElementById("check48").checked = check48status;
				localStorage.setItem('check48', check48status);
			}

			function check49() {

				var check49status = document.getElementById("check49").checked;
				document.getElementById("check49").checked = check49status;
				localStorage.setItem('check49', check49status);
			}

			function check50() {

				var check50status = document.getElementById("check50").checked;
				document.getElementById("check50").checked = check50status;
				localStorage.setItem('check50', check50status);
			}

			function check51() {

				var check51status = document.getElementById("check51").checked;
				document.getElementById("check51").checked = check51status;
				localStorage.setItem('check51', check51status);
			}

			function check52() {

				var check52status = document.getElementById("check52").checked;
				document.getElementById("check52").checked = check52status;
				localStorage.setItem('check52', check52status);
			}

			function check53() {

				var check53status = document.getElementById("check53").checked;
				document.getElementById("check53").checked = check53status;
				localStorage.setItem('check53', check53status);
			}

			function check54() {

				var check54status = document.getElementById("check54").checked;
				document.getElementById("check54").checked = check54status;
				localStorage.setItem('check54', check54status);
			}

			function check55() {

				var check55status = document.getElementById("check55").checked;
				document.getElementById("check55").checked = check55status;
				localStorage.setItem('check55', check55status);
			}

			function check56() {

				var check56status = document.getElementById("check56").checked;
				document.getElementById("check56").checked = check56status;
				localStorage.setItem('check56', check56status);
			}

			function check57() {

				var check57status = document.getElementById("check57").checked;
				document.getElementById("check57").checked = check57status;
				localStorage.setItem('check57', check57status);
			}

			function check58() {

				var check58status = document.getElementById("check58").checked;
				document.getElementById("check58").checked = check58status;
				localStorage.setItem('check58', check58status);
			}

			function check59() {

				var check59status = document.getElementById("check59").checked;
				document.getElementById("check59").checked = check59status;
				localStorage.setItem('check59', check59status);
			}

			function check60() {

				var check60status = document.getElementById("check60").checked;
				document.getElementById("check60").checked = check60status;
				localStorage.setItem('check60', check60status);
			}

			document.addEventListener('DOMContentLoaded', check30(),
				check31(),
				check32(),
				check33(),
				check34(),
				check35(),
				check36(),
				check37(),
				check38(),
				check39(),
				check40(),
				check41(),
				check42(),
				check43(),
				check44(),
				check45(),
				check46(),
				check47(),
				check48(),
				check49(),
				check50(),
				check51(),
				check52(),
				check53(),
				check54(),
				check55(),
				check56());

		document.getElementById('myCheckbox').addEventListener('change', function() {
        // Armazena o estado do checkbox no localStorage
        localStorage.setItem('checkboxState', this.checked);
        });

        // Inicializa o estado do checkbox com o valor armazenado no localStorage (se existir)
        window.addEventListener('load', function() {
            const checkboxState = localStorage.getItem('checkboxState');
            if (checkboxState !== null) {
                document.getElementById('myCheckbox').checked = JSON.parse(checkboxState);
            }
        });