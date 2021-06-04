const checkTextInputs = (selector) => {
    const textInputs = document.querySelectorAll(selector);

    textInputs.forEach(item => {
        item.addEventListener('keypress', function(e) {
            if(e.key.match(/[^а-яё 0-9]/gi)){
                e.preventDefault();
                item.style.border = 'solid 1px red';
                item.placeholder = 'Используйте кириллицу';
            } else {
                item.style.border = '';
                item.placeholder = 'Ваше имя';
            }
        });
    });

    textInputs.forEach(input => {
        input.addEventListener('input', (e)=>{
            if(input.value.search(/[^a-z]/gi)){
                input.value = '';
            }
            
        });
    });
};

export default checkTextInputs;