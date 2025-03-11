// функция смены картинки и подписей к входным данным!!
document.getElementById('showInputs').addEventListener('click', function() {
    let inputType = document.querySelector('input[name="inputType"]:checked').value;
    let trapezoidImg = document.querySelector('#trapezoidImg img');


    let label1 = document.querySelector('label[for="pole1"]');
    let label2 = document.querySelector('label[for="pole2"]');
    let label3 = document.querySelector('label[for="pole3"]');
    let label4 = document.querySelector('label[for="pole4"]');


    if (inputType === 'four_sides') {
        label1.textContent = 'a = ';
        label2.textContent = 'b = ';
        label3.textContent = 'c = ';
        label4.textContent = 'd = ';
        trapezoidImg.src = 'images/2.png';
    } else {
        label1.textContent = 'b = ';
        label2.textContent = 'c = ';
        label3.textContent = 'd = ';
        label4.textContent = 'h = ';
        trapezoidImg.src = 'images/1.png';
    }
});



const inputFields = document.querySelectorAll('#inputFields input');
inputFields.forEach(input => {
    input.addEventListener('click', function() {
        this.style.borderColor = '';
    });
});


const selectElement = document.getElementById('characteristics');
selectElement.addEventListener('focus', function() {
    this.style.borderColor = '';
});



function showError(message, color = 'red') {
    let resultsDiv = document.getElementById('results');
    resultsDiv.textContent = message;
    resultsDiv.style.color = color;
}


function clearErrors(inputs) {
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
    let resultsDiv = document.getElementById('results');
    resultsDiv.textContent = '';
}


function showResults(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = message;
    resultsDiv.style.color = 'black';
}


document.addEventListener('DOMContentLoaded', function () {
    let clearButton = document.getElementById('clear');

    clearButton.addEventListener('click', function () {
        let inputPole1 = document.getElementById('pole1');
        let inputPole2 = document.getElementById('pole2');
        let inputPole3 = document.getElementById('pole3');
        let inputPole4 = document.getElementById('pole4');
        let characteristicsSelect = document.getElementById('characteristics');

        inputPole1.value = '';
        inputPole2.value = '';
        inputPole3.value = '';
        inputPole4.value = '';
        characteristicsSelect.selectedIndex = -1;


        inputPole1.style.borderColor = '';
        inputPole2.style.borderColor = '';
        inputPole3.style.borderColor = '';
        inputPole4.style.borderColor = '';
        characteristicsSelect.style.borderColor = '';

        document.getElementById('results').textContent = '';
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculate');

    calculateButton.addEventListener('click', function () {
        const radioButtons = document.querySelectorAll('input[name="inputType"]');
        let selectedValue;

        radioButtons.forEach(radio => {
            if (radio.checked) {
                selectedValue = radio.value;
            }
        });
        
        if (selectedValue === 'base_height') {
            
            let pole1 = document.getElementById('pole1').value.trim();
            let pole2 = document.getElementById('pole2').value.trim();
            let pole3 = document.getElementById('pole3').value.trim();
            let pole4 = document.getElementById('pole4').value.trim();
            
            let inputPole1 = document.getElementById('pole1');
            let inputPole2 = document.getElementById('pole2');
            let inputPole3 = document.getElementById('pole3');
            let inputPole4 = document.getElementById('pole4');

            
            let characteristicsSelect = document.getElementById('characteristics');
            let selectedCharacteristics = Array.from(characteristicsSelect.selectedOptions).map(option => option.value);

            
            clearErrors([inputPole1, inputPole2, inputPole3, inputPole4, characteristicsSelect]);

            // Проверка на пустые поля
            if (!pole1 || !pole2 || !pole3 || !pole4) {
                showError('Все поля должны быть заполнены.');
                if (!pole1) inputPole1.style.borderColor = 'red';
                if (!pole2) inputPole2.style.borderColor = 'red';
                if (!pole3) inputPole3.style.borderColor = 'red';
                if (!pole4) inputPole4.style.borderColor = 'red';
                return;
            }

            // Проверка на то, что введены числа
            if (isNaN(pole1) || isNaN(pole2) || isNaN(pole3) || isNaN(pole4)) {
                showError('Все значения должны быть числами.');
                if (isNaN(pole1)) inputPole1.style.borderColor = 'red';
                if (isNaN(pole2)) inputPole2.style.borderColor = 'red';
                if (isNaN(pole3)) inputPole3.style.borderColor = 'red';
                if (isNaN(pole4)) inputPole4.style.borderColor = 'red';
                return;
            }
            
            let b = parseFloat(pole1); // Нижнее основание
            let c = parseFloat(pole2); // Левая боковая сторона
            let d = parseFloat(pole3); // Правая боковая сторона
            let h = parseFloat(pole4); // Высота

            // Проверка на отрицательные значения
            if (b <= 0 || c <= 0 || d <= 0 || h <= 0) {
                showError('Все значения должны быть положительными.');
                if (b <= 0) inputPole1.style.borderColor = 'red';
                if (c <= 0) inputPole2.style.borderColor = 'red';
                if (d <= 0) inputPole3.style.borderColor = 'red';
                if (h <= 0) inputPole4.style.borderColor = 'red';
                return;
            }

            let x = Math.sqrt(c ** 2 - h ** 2);
            let y = Math.sqrt(d ** 2 - h ** 2);
            let a = b - (x + y);


            // Проверка, существует ли такая трапеция
            if (!((a + b + c > d) && (a + b + d > c) && (a + c + d > b) && (b + c + d > a))) {
                showError('Трапеция с такими параметрами не существует.');
                return;
            }


            // Проверка, является ли фигура квадратом или прямоугольником (a == b)
            let isRectangle = c === d;

            if (isRectangle) {
                showError('Это квадрат или прямоугольник, не является трапецией по определнию.');
                return;
            }


            // Проверка, выбраны ли характеристики
            if (selectedCharacteristics.length === 0) {
                showError('Выберите хотя бы одну характеристику для вычисления.');
                characteristicsSelect.style.borderColor = 'red';
                return;
            }

            calculateCharacteristics(a, b, c, d, selectedCharacteristics);

            
        } else if (selectedValue === 'four_sides') {

            let pole1 = document.getElementById('pole1').value.trim();
            let pole2 = document.getElementById('pole2').value.trim();
            let pole3 = document.getElementById('pole3').value.trim();
            let pole4 = document.getElementById('pole4').value.trim();

            
            let inputPole1 = document.getElementById('pole1');
            let inputPole2 = document.getElementById('pole2');
            let inputPole3 = document.getElementById('pole3');
            let inputPole4 = document.getElementById('pole4');

            
            let characteristicsSelect = document.getElementById('characteristics');
            let selectedCharacteristics = Array.from(characteristicsSelect.selectedOptions).map(option => option.value);

            
            clearErrors([inputPole1, inputPole2, inputPole3, inputPole4, characteristicsSelect]);

            // Проверка на пустые поля
            if (!pole1 || !pole2 || !pole3 || !pole4) {
                showError('Все поля должны быть заполнены.');
                if (!pole1) inputPole1.style.borderColor = 'red';
                if (!pole2) inputPole2.style.borderColor = 'red';
                if (!pole3) inputPole3.style.borderColor = 'red';
                if (!pole4) inputPole4.style.borderColor = 'red';
                return;
            }

            // Проверка на то, что введены числа
            if (isNaN(pole1) || isNaN(pole2) || isNaN(pole3) || isNaN(pole4)) {
                showError('Все значения должны быть числами.');
                if (isNaN(pole1)) inputPole1.style.borderColor = 'red';
                if (isNaN(pole2)) inputPole2.style.borderColor = 'red';
                if (isNaN(pole3)) inputPole3.style.borderColor = 'red';
                if (isNaN(pole4)) inputPole4.style.borderColor = 'red';
                return;
            }
            
            let a = parseFloat(pole1); // Верхнее основание
            let b = parseFloat(pole2); // Нижнее основание
            let c = parseFloat(pole3); // Левая боковая сторона
            let d = parseFloat(pole4); // Правая боковая сторона

            // Проверка на отрицательные значения
            if (a <= 0 || b <= 0 || c <= 0 || d <= 0) {
                showError('Все значения должны быть положительными.');
                if (a <= 0) inputPole1.style.borderColor = 'red';
                if (b <= 0) inputPole2.style.borderColor = 'red';
                if (c <= 0) inputPole3.style.borderColor = 'red';
                if (d <= 0) inputPole4.style.borderColor = 'red';
                return;
            }

            // Проверка, существует ли такая трапеция
            if (!((a + b + c > d) && (a + b + d > c) && (a + c + d > b) && (b + c + d > a))) {
                showError('Трапеция с такими сторонами не существует.');
                return;
            }

            // Проверка, является ли фигура квадратом или прямоугольником (a == b)
            let isRectangle = a === b;

            if (isRectangle) {
                showError('Это квадрат или прямоугольник, не является трапецией по определнию.');
                return;
            }

            // Проверка, выбраны ли характеристики
            if (selectedCharacteristics.length === 0) {
                showError('Выберите хотя бы одну характеристику для вычисления.');
                characteristicsSelect.style.borderColor = 'red';
                return;
            }

            calculateCharacteristics(a, b, c, d, selectedCharacteristics);

        } else {
            showError('Не выбран тип входных данных.');
            return;
        }
    });
});



// Функция для вычисления характеристик (УЖЕ ПО ВСЕМ СТОРОНАМ!!!!!!!)
function calculateCharacteristics(a, b, c, d, selectedCharacteristics) {
    
    let results = [];

    let m = (a + b) / 2; // средняя линия

    let p = (a + b + c + d) / 2; // полупериметр
    let s = ((a + b) / Math.abs(b - a)) * Math.sqrt((p - b)*(p - a)*(p - b - c)*(p - b - d)); // площадь по Герону
    
    let h = s / m; // высота
    let alphaRad = Math.asin(h / c);
    let betaRad = Math.asin(h / d);

    let alpha = (alphaRad * 180) / Math.PI; // угол alpha в градусах
    let beta = (betaRad * 180) / Math.PI;  // угол beta в градусах
    let gamma = 180 - alpha; // угол над alpha в градусах
    let tetta = 180 - beta; // угол над beta в градусах

    let d1 = Math.sqrt(d ** 2 + a* b - ((b * (d ** 2 - c ** 2)) / (b - a))); // d1 диагональ
    let d2 = Math.sqrt(c ** 2 + a* b - ((b * (c ** 2 - d ** 2)) / (b - a))); // d2 диагональ


    let omegaRad = Math.asin((h * (a + b)) / (d1 * d2));
    let omega = (omegaRad * 180) / Math.PI; // угол omega между диагоналями в градусах


    if (selectedCharacteristics.includes('angles')) {
        results.push(`Угол α: ${alpha.toFixed(2)}°`);
        results.push(`Угол β: ${beta.toFixed(2)}°`);
        results.push(`Угол над α: ${gamma.toFixed(2)}°`);
        results.push(`Угол над β: ${tetta.toFixed(2)}°`);
    }
    if (selectedCharacteristics.includes('diagonals')) {
        results.push(`Диагональ 1: ${d1.toFixed(2)}`);
        results.push(`Диагональ 2: ${d2.toFixed(2)}`);
    }
    if (selectedCharacteristics.includes('area')) {
        results.push(`площадь S = ${s.toFixed(2)}`);
    }
    if (selectedCharacteristics.includes('diagonalAngle')) {
        results.push(`Угол между диагоналями: ${omega.toFixed(2)}°`);
    }

    showResults(results.join('<br>'));
}