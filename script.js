window.onload = function() {
    const filters = document.querySelector('.filters');
    const root = document.querySelector(':root');
    const inputs = filters.querySelectorAll('input');
    const outputs = filters.querySelectorAll('output');
    const reset = document.querySelector('.btn-reset');
    const next = document.querySelector('.btn-next');
    const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
    let btnFS = document.querySelector('.fullscreen');
    let timeOfDay,
        now = new Date(),
        time = now.getHours();
    i = 0;
    const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg',
        '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'
    ];
    switch (true) {
        case 5 <= time && time < 13:
            timeOfDay = 'morning/';
            break;
        case 12 <= time && time < 18:
            timeOfDay = 'day/';
            break;
        case 17 <= time && time < 24:
            timeOfDay = 'evening/';
            break;
        case 0 <= time && time < 6:
            timeOfDay = 'night/';
            break;
        default:
            break;
    };

    function changeVar(target, value) {
        switch (target) {
            case 'blur':
                root.style.setProperty('--' + target, value + 'px');
                break;
            case 'hue':
                root.style.setProperty('--' + target, value + 'deg');
                break;
            default:
                root.style.setProperty('--' + target, value + '%');
                break;
        }
    };

    // FILTERS CONTROL
    filters.addEventListener('input', (e) => {
        let val = e.target.value;
        e.target.nextElementSibling.value = val;

        changeVar(e.target.name, val);
    });

    //RESET BTN
    reset.addEventListener('click', (e) => {
        inputs.forEach(el => {
            if (el.name == 'saturate') {
                el.value = 100;
            } else {
                el.value = 0;
            }
            el.nextElementSibling.value = el.value;
            changeVar(el.name, el.value);
        })
    });

    // NEXT IMAGE
    function loadImage(src) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            document.querySelector('img').src = src;
        };
    };

    function changeImage() {
        const index = i % images.length;
        const imageSrc = base + timeOfDay + images[index];
        console.log(index, imageSrc);
        loadImage(imageSrc);
        i++;
        next.disabled = true;
        setTimeout(function() { next.disabled = false }, 1000);
    };

    next.addEventListener('click', changeImage);

    // LOAD IMAGE

    const fileInput = document.querySelector('.btn-load--input');

    fileInput.addEventListener('change', function(e) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            loadImage(img.src);
        }
        reader.readAsDataURL(file);
        fileInput.value = '';
    });




    // FULLSCREEN

    btnFS.addEventListener('click', (event) => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            btnFS.classList.add('isFS');
        } else {
            document.exitFullscreen();
            btnFS.classList.remove('isFS');
        }
    });
}