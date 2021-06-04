const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.style.margin = "0 auto";
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    const clickBtn = (button, selector) => {
        const btn = menu.querySelector(button),
              mark = wrapper.querySelectorAll(selector);
        if (selector) {
            btn.addEventListener('click', () => typeFilter(mark));
        } else {
            btn.addEventListener('click', () => typeFilter());
        }
    };

    clickBtn('.all', '.all');
    clickBtn('.lovers', '.lovers');
    clickBtn('.chef', '.chef');
    clickBtn('.girl', '.girl');
    clickBtn('.guy', '.guy');
    clickBtn('.grandmother');
    clickBtn('.granddad');

    menu.addEventListener('click', event => {
        let target = event.target;

        if (target && target.tagName == 'LI') {
            items.forEach(item => {
                item.classList.remove('active');
            });
            target.classList.add('active');
        }
    });
};

export default filter;