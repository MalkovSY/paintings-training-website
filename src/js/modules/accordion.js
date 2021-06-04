const accordion = (triggersSelector, blocksSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-block');

            if (this.classList.contains('active-style')) {
                btns.forEach(btn => {
                    btn.classList.remove('active-style');
                    btn.nextElementSibling.classList.remove('active-block');
                    btn.nextElementSibling.style.maxHeight = '0px';
                });
                this.classList.add('active-style');
                this.nextElementSibling.classList.add('active-block');
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });

    //С помощью css стилей:
        //   blocks = document.querySelectorAll(blocksSelector);

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         if (!this.classList.contains('active')){
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });

};

export default accordion;