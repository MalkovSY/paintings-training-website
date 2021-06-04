const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
        elem.focus(); //устанавливаем фокус на элементе

        if(elem.setSelectionRange){
            elem.setSelectionRange(pos, pos);
        } else if(elem.createTextRange) { //ручной полифил для IE старых
            let range = elem.createTextRange();

            range.collapse(true); //объединяет граничные точки диапазона(стоит поумолчанию true, но лучше указывать)
            range.moveEnd('character', pos);
            range.moveStart('character', pos); //по факту просто установится курсор в определенное место
            range.select();
        }
    };

    function maskMake(event) {
        let matrix = '+7 (___) ___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

    if(def.length >= val.length){
        val = def;//Не даем из матрицы удалять символы (7, етс)
    }

    this.value = matrix.replace(/./g, function(a) { //функция выполнится для каждого найденного элемента в matrix.Вместо a - каждый символ матрицы
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

    // if(event.type === 'blur'){
    //     if(this.value.length == 2){
    //         this.value = '';
    //     } else {
    //         setCursorPosition(this.value.length, this);
    //     }
    // }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(item => {
        item.addEventListener('input', maskMake);
        item.addEventListener('focus', maskMake);
        item.addEventListener('blur', maskMake); 
        item.addEventListener('click', function() {
            fCurPosEnd(this);
          });
    });

    function fCurPosEnd(el) {
        if(el.value === '+7'){
        el.selectionStart = el.value.length;
        }
      }

};

export default mask;