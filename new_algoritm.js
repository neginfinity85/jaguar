document.addEventListener('DOMContentLoaded', () => {
	// Variables ================================================== //
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

	const tableTag = document.querySelector('table');

	let positionsList = {};
	let firstFreePositionsArr = [...stationsArray];
	let secondFreePositionsArr = [...stationsArray];
	let thirdFreePositionsArr = [...stationsArray];

	// Functions ================================================================= //
	function sortObj(obj) {
		obj.sort((a, b) => (a.stations.length > b.stations.length ? 1 : -1));
	}

	function findFreeStation(knownStations, freeStationsArr) {
		// Проверка если станции которые знает сотрудник все заняты присваиваем ему значение No Free position
		let isFreePostion = false;
		let availableArr = []; // массив доступных станций
		for (let i = 0; i < knownStations.length; i++) {
			if (freeStationsArr.indexOf(knownStations[i]) != -1) {
				isFreePostion = true;
				availableArr.push(knownStations[i]);
			}
		}

		if (!isFreePostion) {
			return '<span class="error">No Free position</span>';
		}

		// Если свободной осталась только одна станция
		if (availableArr.length == 1) {
			freeStationsArr[freeStationsArr.indexOf(availableArr[0])] = '0';
			return availableArr[0];
		}

		// Проверка наличия доступных станций
		let availablePosition = 0;
		for (let i = 0; i < availableArr.length; i++) {
			if (freeStationsArr.indexOf(availableArr[i]) != -1)
				availablePosition++;
		}

		if (availablePosition == 0) {
			return '<span class="error">ERROR</span>';
		}

		// Подбор случайной позиции из списка свободных
		let findFreeStation = false;
		let result;
		while (!findFreeStation) {
			result =
				knownStations[Math.floor(Math.random() * knownStations.length)];

			if (freeStationsArr.indexOf(result) != -1 && result != '0') {
				freeStationsArr[freeStationsArr.indexOf(result)] = '0';
				findFreeStation = true;
			}
		}
		return result;
	}

	function setToPositions(
		worker,
		stationsWhichHeKnows,
		newPostitions,
		firstPosArr,
		secondPosArr,
		thirdPosArr,
	) {
		newPostitions[worker] = [];
		// If worker knows only one station ========================================
		if (stationsWhichHeKnows.length == 1) {
			newPostitions[worker] = [
				stationsWhichHeKnows[0],
				stationsWhichHeKnows[0],
				stationsWhichHeKnows[0],
			];
			firstPosArr[firstPosArr.indexOf(newPostitions[worker][0])] = '0';
			secondPosArr[secondPosArr.indexOf(newPostitions[worker][0])] = '0';
			thirdPosArr[thirdPosArr.indexOf(newPostitions[worker][0])] = '0';
			return;
		}

		// If worker knows only two stations ========================================
		if (stationsWhichHeKnows.length == 2) {
			let randomPosition = Math.floor(
				Math.random() * stationsWhichHeKnows.length,
			);
			if (
				firstPosArr[
					firstPosArr.indexOf(stationsWhichHeKnows[randomPosition])
				] != -1 &&
				firstPosArr[
					firstPosArr.indexOf(stationsWhichHeKnows[randomPosition])
				] != '0'
			) {
				newPostitions[worker] = [
					stationsWhichHeKnows[randomPosition],
					stationsWhichHeKnows[randomPosition == 0 ? 1 : 0],
					stationsWhichHeKnows[randomPosition],
				];
				firstPosArr[
					firstPosArr.indexOf(newPostitions[worker][randomPosition])
				] = '0';
				secondPosArr[
					secondPosArr.indexOf(
						newPostitions[worker][randomPosition == 0 ? 1 : 0],
					)
				] = '0';
				thirdPosArr[
					thirdPosArr.indexOf(newPostitions[worker][randomPosition])
				] = '0';
			} else {
				newPostitions[worker] = [
					stationsWhichHeKnows[randomPosition == 0 ? 1 : 0],
					stationsWhichHeKnows[randomPosition],
					stationsWhichHeKnows[randomPosition == 0 ? 1 : 0],
				];
				firstPosArr[
					firstPosArr.indexOf(newPostitions[worker][randomPosition])
				] = '0';
				secondPosArr[
					secondPosArr.indexOf(
						newPostitions[worker][randomPosition == 0 ? 1 : 0],
					)
				] = '0';
				thirdPosArr[
					thirdPosArr.indexOf(newPostitions[worker][randomPosition])
				] = '0';
			}
			return;
		}

		newPostitions[worker][0] = findFreeStation(
			stationsWhichHeKnows,
			firstPosArr,
		);
		newPostitions[worker][1] = findFreeStation(
			stationsWhichHeKnows,
			secondPosArr,
		);
		newPostitions[worker][2] = findFreeStation(
			stationsWhichHeKnows,
			thirdPosArr,
		);
	} // end setToPositions function

	function makeList() {
		// Подбираем станции для всех операторов Первый список
		for (let j = 0; j < workers.length; j++) {
			if (workers[j].active) {
				setToPositions(
					workers[j].name,
					workers[j].stations,
					positionsList,
					firstFreePositionsArr,
					secondFreePositionsArr,
					thirdFreePositionsArr,
				);
			}
		}

		// Вывод на страницу Операторов и их позиции
		for (let key in positionsList) {
			let row = document.createElement('tr');
			row.innerHTML = `
              <td>${key}</td><td class="text-center">${
				positionsList[key][0]
			}</td><td class="text-center">${
				positionsList[key][1] == positionsList[key][0]
					? '<span class="error">' + positionsList[key][1] + '</span>'
					: positionsList[key][1]
			}</td><td class="text-center">${
				positionsList[key][2] == positionsList[key][1] ||
				positionsList[key][2] == positionsList[key][0]
					? '<span class="error">' + positionsList[key][2] + '</span>'
					: positionsList[key][2]
			}</td>
             `;
			tableTag.append(row);
		}
	}

	sortObj(workers);
	makeList();
}); // DOMContentLoaded
