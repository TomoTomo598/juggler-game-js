function $(name, dataBy) {
    let selecter;
    switch (dataBy) {
        case 'class':
            selecter = '.' + name;
            break;
        
        case 'id':
            selecter = '#' + name;
            break;
        
        case 'data':
            selecter = '[' + name + ']';
            break;
        default:
            selecter = '.' + name;
    }
    return document.querySelector(selecter);
}

export default $;