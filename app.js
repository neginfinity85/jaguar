document.addEventListener('DOMContentLoaded', () => {
	let stationsArray = [
		'8',
		'9mm',
		'9mr',
		'10',
		'11',
		'12mm',
		'12lm',
		'13',
		'14',
	];

	stationsArray.sort();

	let workers = [
		{
			name: 'Rasťo',
			stations: [
				'8',
				'9mm',
				'9mr',
				'10',
				'11',
				'12mm',
				'12lm',
				'13',
				'14',
			],
			active: true,
		},
		{
			name: 'Zuzana',
			stations: ['9mm', '9mr', '10', '11', '12mm', '12lm', '13', '14'],
			active: true,
		},
		{
			name: 'Marina',
			stations: [
				'8',
				'9mm',
				'9mr',
				'10',
				'11',
				'12mm',
				'12lm',
				'13',
				'14',
			],
			active: false,
		},
		{
			name: 'Braňo',
			stations: ['8', '9mr'],
			active: true,
		},
		{
			name: 'Vika',
			stations: ['9mr', '11', '12lm', '12mm', '13'],
			active: true,
		},
		{
			name: 'Kaťa',
			stations: [
				'8',
				'9mm',
				'9mr',
				'10',
				'11',
				'12mm',
				'12lm',
				'13',
				'14',
			],
			active: true,
		},
		{
			name: 'Katka',
			stations: ['8', '9mm', '10', '11', '12lm', '14'],
			active: true,
		},
		{
			name: 'Dada',
			stations: ['8', '9mr', '11', '12lm', '14'],
			active: true,
		},
		{
			name: 'Maša',
			stations: ['8', '9mm', '9mr', '10', '11', '12lm', '12mm'],
			active: true,
		},
		{
			name: 'Serhii',
			stations: ['8', '9mr', '9mm', '10', '13'],
			active: true,
		},
	];

	/* ============================================================================ */
	loadSettingsFromLocalStorage();

	/* ======================================================================================================== */

	// Функция подбора первых позиций для операторов
	function setWorkersToFirstPosition(
		worker,
		stationsWichHeKnows,
		position,
		arrayWithFreePositions,
	) {
		let findFreeStation = false;

		if (stationsWichHeKnows.length == 1) {
			//Если сотрудник знает только одну станцию ставим его на эту станцию
			position[worker] = stationsWichHeKnows[0];
			arrayWithFreePositions[
				arrayWithFreePositions.indexOf(position[worker])
			] = '0';
			return;
		}

		// Проверка если станции которые знает сотрудник все заняты присваиваем ему значение No Free position
		let isFreePostion = false;
		let availableArr = []; // массив доступных станций
		for (let a = 0; a < stationsWichHeKnows.length; a++) {
			if (arrayWithFreePositions.indexOf(stationsWichHeKnows[a]) != -1) {
				isFreePostion = true;
				availableArr.push(stationsWichHeKnows[a]);
			}
		}

		if (!isFreePostion) {
			position[worker] = '<span class="error">No Free position</span>';
			return;
		}

		// Если свободной осталась только одна станция
		if (availableArr.length == 1) {
			position[worker] = availableArr[0];
			arrayWithFreePositions[
				arrayWithFreePositions.indexOf(position[worker])
			] = '0';
			return;
		}

		// Проверка наличия доступных станций
		let availablePosition = 0;
		for (let i = 0; i < availableArr.length; i++) {
			if (arrayWithFreePositions.indexOf(availableArr[i]) != -1)
				availablePosition++;
		}

		if (availablePosition == 0) {
			position[worker] = '<span class="error">ERROR</span>'; // No available position
			return;
		}

		// Подбор случайной позиции из списка свободных
		while (!findFreeStation) {
			position[worker] =
				stationsWichHeKnows[
					Math.floor(Math.random() * stationsWichHeKnows.length)
				];

			if (
				arrayWithFreePositions.indexOf(position[worker]) != -1 &&
				position[worker] != '0'
			) {
				arrayWithFreePositions[
					arrayWithFreePositions.indexOf(position[worker])
				] = '0';
				findFreeStation = true;
			}
		}
		return;
	}

	/* ======================================================================================================== */

	// Создние списка вторых позиций
	function setWorkersToSecondPosition(
		worker,
		stationsWichHeKnows,
		position,
		arrayWithFreePositions,
	) {
		let findFreeStation = false;

		if (stationsWichHeKnows.length == 1) {
			//Если сотрудник знает только одну станцию ставим его на эту станцию
			position[worker] = stationsWichHeKnows[0];
			arrayWithFreePositions[
				arrayWithFreePositions.indexOf(position[worker])
			] = '0';
			return;
		}

		// Если сотрудник знает только две позиции ставим его на позицию отличную от первой
		if (stationsWichHeKnows.length == 2) {
			if (firstPosition[worker] == stationsWichHeKnows[0]) {
				position[worker] = stationsWichHeKnows[1];
				arrayWithFreePositions[
					arrayWithFreePositions.indexOf(position[worker])
				] = '0';
			} else {
				position[worker] = stationsWichHeKnows[0];
				arrayWithFreePositions[
					arrayWithFreePositions.indexOf(position[worker])
				] = '0';
			}
			return;
		}

		// Проверка если станции которые знает сотрудник все заняты присваиваем ему значение No Free position
		let isFreePostion = false;
		let availableArr = []; // массив доступных станций
		for (let a = 0; a < stationsWichHeKnows.length; a++) {
			if (arrayWithFreePositions.indexOf(stationsWichHeKnows[a]) != -1) {
				isFreePostion = true;
				availableArr.push(stationsWichHeKnows[a]);
			}
		}

		if (!isFreePostion) {
			position[worker] = '<span class="error">No Free position</span>';
			return;
		}

		// Если свободной осталась только одна станция
		if (availableArr.length == 1) {
			position[worker] = availableArr[0];
			arrayWithFreePositions[
				arrayWithFreePositions.indexOf(position[worker])
			] = '0';
			return;
		}

		// Проверка наличия доступных станций
		let availablePosition = 0;
		for (let i = 0; i < availableArr.length; i++) {
			if (
				arrayWithFreePositions.indexOf(availableArr[i]) != -1 &&
				availableArr[i] != firstPosition[worker]
			)
				availablePosition++;
		}

		if (availablePosition == 0) {
			position[worker] = '<span class="error">ERROR</span>'; // No available position
			return;
		}

		// Подбор случайной позиции из списка свободных
		while (!findFreeStation) {
			position[worker] =
				stationsWichHeKnows[
					Math.floor(Math.random() * stationsWichHeKnows.length)
				];

			if (
				arrayWithFreePositions.indexOf(position[worker]) != -1 &&
				position[worker] != '0' &&
				position[worker] != firstPosition[worker]
			) {
				arrayWithFreePositions[
					arrayWithFreePositions.indexOf(position[worker])
				] = '0';
				findFreeStation = true;
			}
		}
		return;
	}

	/* ======================================================================================================== */

	// Создание списка третих позиций
	function setWorkersToThirdPosition(
		worker,
		stationsWichHeKnows,
		position,
		arrayWithFreePositions,
	) {
		if (stationsWichHeKnows.length == 1) {
			//Если сотрудник знает только одну станцию ставим его на эту станцию
			position[worker] = stationsWichHeKnows[0];
			arrayWithFreePositions[
				arrayWithFreePositions.indexOf(position[worker])
			] = '0';
			return;
		}

		// Если сотрудник знает только две позиции ставим его на позицию firstPosition
		if (stationsWichHeKnows.length == 2) {
			position[worker] = firstPosition[worker];
			arrayWithFreePositions[
				arrayWithFreePositions.indexOf(position[worker])
			] = '0';

			return;
		}

		// Проверка если станции которые знает сотрудник все заняты присваиваем ему значение No Free position
		let isFreePostion = false;
		let availableArr = []; // массив доступных станций
		for (let a = 0; a < stationsWichHeKnows.length; a++) {
			if (arrayWithFreePositions.indexOf(stationsWichHeKnows[a]) != -1) {
				isFreePostion = true;
				availableArr.push(stationsWichHeKnows[a]);
			}
		}

		if (!isFreePostion) {
			position[worker] = '<span class="error">No Free position</span>'; //No Free position
			return;
		}

		// Если свободной осталась только одна станция
		if (availableArr.length == 1) {
			position[worker] = availableArr[0];
			arrayWithFreePositions[
				arrayWithFreePositions.indexOf(position[worker])
			] = '0';
			return;
		}

		// // Проверка наличия доступных станций
		let availablePosition = 0;
		for (let i = 0; i < availableArr.length; i++) {
			if (
				arrayWithFreePositions.indexOf(availableArr[i]) != -1 &&
				availableArr[i] != firstPosition[worker] &&
				availableArr[i] != secondPosition[worker]
			)
				availablePosition++;
		}

		if (availablePosition == 0) {
			position[worker] = '<span class="error">ERROR</span>'; // No available position
			return;
		}

		// Подбор случайной позиции из списка свободных
		let findFreeStation = false;
		while (!findFreeStation) {
			position[worker] =
				stationsWichHeKnows[
					Math.floor(Math.random() * stationsWichHeKnows.length)
				];

			if (
				arrayWithFreePositions.indexOf(position[worker]) != -1 &&
				position[worker] != '0' &&
				position[worker] != secondPosition[worker] &&
				position[worker] != firstPosition[worker]
			) {
				arrayWithFreePositions[
					arrayWithFreePositions.indexOf(position[worker])
				] = '0';
				findFreeStation = true;
			}
		}
		return;
	}

	/* ======================================================================================================== */
	// Сортировка операторов по кол-ву изученных станций от меньшего к большему
	function sortWorkers() {
		workers.sort((a, b) =>
			a.stations.length > b.stations.length ? 1 : -1,
		);
	}
	sortWorkers();
	const tableTag = document.querySelector('table');
	const modal = document.querySelector('.modal');
	const modalContent = document.querySelector('.modal__content');

	let firstPosition = {}; // Первый набор позиций для операторов
	let firstTmpStationsArray = stationsArray.slice(); // Временный массив со списком свободных станций

	let secondPosition = {}; // Второй набор позиций для операторов
	let secondTmpStationsArray = [...stationsArray]; // временный массив со списком свободных станций

	let thirdPosition = {}; // Третий набор позиций для операторов
	let thirdTmpStationsArray = [...stationsArray]; // временный массив со списком свободных станций

	function makeList() {
		// Check count of stations and active operators
		let activeWorkersCount = 0;
		workers.forEach(item => {
			item.active ? activeWorkersCount++ : 0;
		});

		if (activeWorkersCount != stationsArray.length) {
			modalContent.innerHTML = `
			 <div class="modal__close" data-close>&times;</div>
			 <div>CHYBA: počet operátorov a staníc musí byť rovnaký!</div>
			<div>ERROR: the number of operators and stations should be the same!</div>
			<div>ПОМИЛКА: кількість операторів і станцій має бути однаковою!</div>			
			<button class="btn" data-close>OK</button>
			`;
			showModalWindow();
			return;
		}
		// Подбираем станции для всех операторов Первый список
		for (let j = 0; j < workers.length; j++) {
			if (workers[j].active) {
				setWorkersToFirstPosition(
					workers[j].name,
					workers[j].stations,
					firstPosition,
					firstTmpStationsArray,
				);
			}
		}

		// Подбираем станции для всех операторов Второй список
		for (let j = 0; j < workers.length; j++) {
			if (workers[j].active) {
				setWorkersToSecondPosition(
					workers[j].name,
					workers[j].stations,
					secondPosition,
					secondTmpStationsArray,
				);
			}
		}

		// Подбираем станции для всех операторов Третий список
		for (let j = 0; j < workers.length; j++) {
			if (workers[j].active) {
				setWorkersToThirdPosition(
					workers[j].name,
					workers[j].stations,
					thirdPosition,
					thirdTmpStationsArray,
				);
			}
		}

		// Вывод на страницу Операторов и их позиции
		for (let key in firstPosition) {
			let row = document.createElement('tr');
			row.innerHTML = `
              <td>${key}</td><td class="text-center">${
				firstPosition[key]
			}</td><td class="text-center">${
				secondPosition[key] == firstPosition[key]
					? '<span class="error">' + secondPosition[key] + '</span>'
					: secondPosition[key]
			}</td><td class="text-center">${
				thirdPosition[key] == secondPosition[key] ||
				thirdPosition[key] == firstPosition[key]
					? '<span class="error">' + thirdPosition[key] + '</span>'
					: thirdPosition[key]
			}</td>
             `;
			tableTag.append(row);
		}
	}

	makeList();

	const btn = document.getElementById('makeNewList');
	btn.addEventListener('click', () => {
		firstPosition = {};
		secondPosition = {};
		thirdPosition = {};
		firstTmpStationsArray = [...stationsArray];
		secondTmpStationsArray = [...stationsArray];
		thirdTmpStationsArray = [...stationsArray];

		tableTag.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Position 1</th>
            <th>Position 2</th>
            <th>Postions 3</th>
        </tr>
        `;

		makeList();
	});

	// Tabs ================================================= //
	const tabs = document.querySelectorAll('.tabs__header'),
		tabsContent = document.querySelectorAll('.tabs__item'),
		tabsParent = document.querySelector('.tabs');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', event => {
		const target = event.target;

		if (target && target.classList.contains('tabs__header')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	/* Show stations function ===================================================== */
	const stationsContent = document.querySelector('.stations__content');
	function showStations() {
		stationsContent.innerHTML = '';
		for (let i = 0; i < stationsArray.length; i++) {
			let stationNameEl = document.createElement('SPAN');
			stationNameEl.innerHTML = stationsArray[i].toUpperCase();

			let spanElem = document.createElement('SPAN');
			spanElem.classList.add('stations__delete');
			spanElem.innerHTML = '&#9940;';
			spanElem.setAttribute('title', 'Delete station!');

			let divElem = document.createElement('div');
			divElem.setAttribute('title', `${stationsArray[i]}`);

			stationsContent.append(divElem);
			divElem.append(stationNameEl);
			divElem.append(spanElem);
			spanElem.addEventListener('click', deleteStation);
		}
	}
	showStations();

	/* Delete station function ===================================================== */
	function deleteStation(event) {
		const station = event.target.parentElement.getAttribute('title');
		const index = stationsArray.indexOf(station);
		stationsArray.splice(index, 1);
		workers.forEach(item => {
			if (item.stations.indexOf(station) != -1) {
				item.stations.splice(item.stations.indexOf(station), 1);
			}
		});
		showStations();
		showOperators();
		saveSettingsToLocalStorage();
	}

	/* Add station function ===================================================== */
	function addStation(event) {
		event.preventDefault();
		let newStationName = document.getElementById('newStationName').value;
		newStationName = newStationName.trim().toLowerCase();

		if (
			newStationName != '' &&
			newStationName != '0' &&
			stationsArray.indexOf(newStationName) == -1
		) {
			stationsArray.push(newStationName);
			document.getElementById('stations').reset();
			stationsArray.sort();

			showStations();
			showOperators();
			saveSettingsToLocalStorage();
		} else {
			switch (newStationName) {
				case '':
					modalContent.innerHTML = `
					<div class="modal__close" data-close>&times;</div>
					<div>CHYBA: Názov stanice nemôže byť prázdny!</div>
					<div>ERROR: Station name cannot be empty!</div>
					<div>ПОМИЛКА: Ім'я станції не може бути порожнім!</div>			
					<button class="btn" data-close>OK</button>
					`;
					break;
				case '0':
					modalContent.innerHTML = `
					<div class="modal__close" data-close>&times;</div>
					<div>CHYBA: Názov stanice nemôže byť 0</div>
					<div>ERROR: The station name cannot be 0</div>
					<div>ПОМИЛКА: Ім'я станції не може бути 0</div>			
					<button class="btn" data-close>OK</button>
					`;
					break;
				default:
					modalContent.innerHTML = `
					<div class="modal__close" data-close>&times;</div>
					<div>CHYBA: Už máte stanicu s názvom  ${newStationName}</div>
					<div>ERROR: You already have a station named ${newStationName}</div>
					<div>ПОМИЛКА: У Вас уже є станція з ім'ям ${newStationName}</div>			
					<button class="btn" data-close>OK</button>
					`;
			}
			showModalWindow();
		}
	}

	let addStationButton = document.getElementById('addStation');
	addStationButton.addEventListener('click', addStation);

	/* Activate and Deactivate operator function ================================================ */
	function activateOperator(event) {
		let operator = event.target;
		for (let i = 0; i < workers.length; i++) {
			if (workers[i].name == operator.value) {
				workers[i].active = operator.checked;
			}
		}
		showOperators();
		saveSettingsToLocalStorage();
	}

	/* Show operators function ===================================================== */
	const operatorsContent = document.querySelector('.operators__content');
	function showOperators() {
		operatorsContent.innerHTML = '';
		for (let i = 0; i < workers.length; i++) {
			let divElem = document.createElement('DIV');
			divElem.classList.add('operators__line');

			let operatorNameDiv = document.createElement('DIV');
			operatorNameDiv.setAttribute('class', 'operators__name');
			operatorNameDiv.innerHTML = workers[i].name;

			let operActiveChkbx = document.createElement('INPUT');
			operActiveChkbx.setAttribute('type', 'checkbox');
			operActiveChkbx.checked = workers[i].active;
			operActiveChkbx.setAttribute('value', `${workers[i].name}`);
			operActiveChkbx.addEventListener('change', activateOperator);

			let spanElem = document.createElement('SPAN');
			spanElem.classList.add('operators__delete');
			spanElem.innerHTML = '&#9940;';
			spanElem.setAttribute('title', 'Remove operator!');
			spanElem.setAttribute('value', `${workers[i].name}`);
			spanElem.addEventListener('click', deleteOperator);

			if (workers[i].active == false) {
				operatorNameDiv.classList.add('operators--not-active');
				divElem.classList.add('operators--not-active');
			}

			operatorsContent.append(divElem);
			divElem.append(operatorNameDiv);
			operatorNameDiv.append(operActiveChkbx);
			operatorNameDiv.append(spanElem);

			for (let j = 0; j < stationsArray.length; j++) {
				let checkBoxEl = document.createElement('INPUT');
				checkBoxEl.setAttribute('type', 'checkbox');
				checkBoxEl.addEventListener('change', learnNewStation);

				if (workers[i].stations.indexOf(stationsArray[j]) != -1) {
					checkBoxEl.checked = true;
				}

				checkBoxEl.setAttribute(
					'id',
					`${workers[i].name}_${stationsArray[j]}`,
				);

				let labelEl = document.createElement('LABEL');
				labelEl.setAttribute(
					'for',
					`${workers[i].name}_${stationsArray[j]}`,
				);
				labelEl.innerHTML = stationsArray[j].toUpperCase();

				divElem.append(checkBoxEl, labelEl);
			}
		}
	}

	showOperators();

	/* Operator learn new station function =============================================== */
	function learnNewStation(event) {
		let target = event.target;
		let arr = target.id.split('_');
		let operatorName = arr[0];
		let newStation = arr[1];

		if (target.checked) {
			for (let i = 0; i < workers.length; i++) {
				if (workers[i].name == operatorName) {
					workers[i].stations.push(newStation);
				}
			}
		} else {
			for (let i = 0; i < workers.length; i++) {
				if (workers[i].name == operatorName) {
					workers[i].stations.forEach((item, index) => {
						if (item == newStation) {
							workers[i].stations.splice(index, 1);
						}
					});
				}
			}
		}
		sortWorkers();
		saveSettingsToLocalStorage();
	}

	/* Add new operator function =============================================== */
	function addNewOperator(event) {
		event.preventDefault();

		let newOperatorName = document.getElementById('newOperatorName').value;
		newOperatorName = newOperatorName.trim();

		for (let i = 0; i < workers.length; i++) {
			if (
				workers[i].name.toLocaleUpperCase() ===
				newOperatorName.toLocaleUpperCase()
			) {
				modalContent.innerHTML = `
					<div class="modal__close" data-close>&times;</div>
					<div>CHYBA: Už máte operátora s rovnakým menom!</div>
					<div>ERROR: You already have an operator with the same name!</div>
					<div>ПОМИЛКА:У вас уже є оператор із таким самим ім'ям!</div>			
					<button class="btn" data-close>OK</button>
					`;
				showModalWindow();
				return;
			}
		}

		if (newOperatorName != '' && newOperatorName != undefined) {
			let newWorker = {
				name: newOperatorName,
				active: false,
				stations: [],
			};
			workers.push(newWorker);
			document.getElementById('operators').reset();
			sortWorkers();
			showOperators();
			saveSettingsToLocalStorage();
		}
	}

	const addOperator = document.getElementById('addOperator');
	addOperator.addEventListener('click', addNewOperator);

	/* Delete operator function =============================================== */
	function deleteOperator(event) {
		let operator = event.target.getAttribute('value');

		for (let i = 0; i < workers.length; i++) {
			if (workers[i].name === operator) {
				workers.splice(i, 1);
			}
		}

		showOperators();
		saveSettingsToLocalStorage();
	}

	/* Load Settings from localStorage function =============================================== */
	function loadSettingsFromLocalStorage() {
		if (localStorage.jaguarStations != undefined) {
			stationsArray = JSON.parse(localStorage.jaguarStations);
		} else {
			localStorage.jaguarStations = JSON.stringify(stationsArray);
		}

		if (localStorage.jaguarWorkers != undefined) {
			workers = JSON.parse(localStorage.jaguarWorkers);
		} else {
			localStorage.jaguarWorkers = JSON.stringify(workers);
		}
	}

	/* Save Settings to localStorage function =============================================== */
	function saveSettingsToLocalStorage() {
		localStorage.jaguarStations = JSON.stringify(stationsArray);
		localStorage.jaguarWorkers = JSON.stringify(workers);
	}

	/* Show and Close Modal Window functions =============================================== */
	modal.addEventListener('click', e => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModalWindow();
		}
	});

	function closeModalWindow() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	function showModalWindow() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	}
}); // DOMContentLoaded
