import {postData} from '../services/requests';

const forms = () => {
const form = document.querySelectorAll('form'),
      inputs = document.querySelectorAll('input'),
      upload = document.querySelectorAll('[name="upload"');

    const message = {
        loading: 'Идет отправка',
        success: 'Отправлено, мы свяжемся',
        failure: 'Ошибка',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const method = item.files[0].name.split('.');

            if(method[0].length > 5){
                dots = '...';
            } else {
                dots = '.';
            }

            const name = method[0].substring(0, 6) + dots + method[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            
            if(item.classList.contains('calc_form')){
                formData.append('calcPrice', document.querySelector('.calc-price').textContent);
            }
            
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question; //ищет блок по селектору выше по иерархии.Если найдет-получим его, нет - false.если true тернальным оператором устанавливает api путь дизайнер.false - question          
            console.log(api);

                postData(api, formData)
                        .then(res => {
                            console.log(res);
                            statusImg.setAttribute('src', message.ok);
                            textMessage.textContent = message.success;
                        })
                        .catch((trouble) => {
                            console.log(trouble);
                            statusImg.setAttribute('src', message.fail);
                            textMessage.textContent = message.failure;
                        })
                        .finally(() => {
                            clearInputs();
                            setTimeout(() => {
                                statusMessage.remove();
                                item.style.display = 'block';
                                item.classList.remove('fadeOutUp');
                                item.classList.add('fadeInUp');
                            }, 4000);
                        });
        });
    });

};

export default forms;