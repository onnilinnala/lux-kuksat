const saveAttr = () => {
    return null
}

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const populateNumber = (value) => {
    const lpk = document.getElementById('lpk')
    lpk.innerHTML = ''
    let selectedRange = []
    switch(value) {
        default:
            break;
        case 'sade':
            selectedRange = range(200, 243, 1)
            break;
        case 'loiste':
            selectedRange = range(300, 321, 1)
            break;
        case 'hehku': 
            selectedRange = range(100, 154, 1)
            break;
        case 'halo': 
            selectedRange = range(400, 432, 1)
            break;
        case 'fotoni':
            selectedRange = range(500, 524, 1)
            break;
        case 'tuike': 
            selectedRange = range(600, 621, 1)
            break;
    }

    selectedRange.forEach(item => {
        let opt = document.createElement('option')
        opt.text = item;
        opt.value = item;
        lpk.add(opt)
    })
}

const createList = () => {
    const leiri = document.getElementById('leiri').value

    populateNumber(leiri)

}



