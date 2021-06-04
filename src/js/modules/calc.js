import {getResource} from '../services/requests';

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);
    
    let sum = 0;

    const calculate = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if(sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите материал и размер картины';
        } else if(promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };

    sizeBlock.addEventListener('change', calculate);
    materialBlock.addEventListener('change', calculate);
    optionsBlock.addEventListener('change', calculate);
    promocodeBlock.addEventListener('input', calculate);
    resultBlock.addEventListener('change', calculate);
};

export default calc;