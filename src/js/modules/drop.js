import {postData} from '../services/requests';

const drop = () => {
    //в браузере 8 событий связанных с перетаскиванием (drag, dragend, dragexit, dragstart(на елементе, который перетаскиваем) 
    //dragleave(объект за пределы dropArea), dragenter(объект над dropArea), dragover(объект над dropArea), drop(объект упал в dropArea))

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(elem) {
        elem.closest('.file_upload').style.border = "2px solid yellow";
        elem.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .2)";
    } 

    function unHighlight(elem) {
        elem.closest('.file_upload').style.border = "";

        if (elem.closest('.calc_form')) {
            elem.closest('.file_upload').style.backgroundColor = "white";
        } else if (elem.closest('.popup-content')) {
            elem.closest('.file_upload').style.backgroundColor = "#ededed";
        } else {
            elem.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        }
    } 

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => { //можно при помощи fetch запроса отправить дропнутый файл ещё до того, как юзер нажмет "загрузить"
            input.files = e.dataTransfer.files; 
            
            let data = new FormData();
            data.append('file', input.files[0]);
            
            postData('assets/server.php', data)
                        .then(res => {
                            console.log(res);
                        })
                        .catch((trouble) => {
                            console.log(trouble);
                        })
                        .finally(() => {
                            input.value = '';
                            input.previousElementSibling.textContent = 'Файл отправлен!';
                        });
            

            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;