const stationsArray = [
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
const workers = [
	{
		name: 'Rasťo',
		stations: stationsArray,
		active: true,
	},
	{
		name: 'Zuzana',
		stations: ['9mm', '9mr', '10', '11', '12mm', '12lm', '13', '14'],
		active: true,
	},
	{
		name: 'Marina',
		stations: stationsArray,
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
		stations: stationsArray,
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
workers.sort((a, b) => (a.stations.length > b.stations.length ? 1 : -1));

let firstPosition = {}; // Первый набор позиций для операторов
let firstTmpStationsArray = stationsArray.slice(); // Временный массив со списком свободных станций
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

let secondPosition = {}; // Второй набор позиций для операторов
let secondTmpStationsArray = [...stationsArray]; // временный массив со списком свободных станций
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

let thirdPosition = {}; // Третий набор позиций для операторов
let thirdTmpStationsArray = [...stationsArray]; // временный массив со списком свободных станций
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
	document.querySelector('table').append(row);
}
