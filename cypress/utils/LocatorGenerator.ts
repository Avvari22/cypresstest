export class LocatorGenerator{
    static generator(element: Element) : string{
        const htmlElement = element as HTMLElement;
        if(htmlElement.id){
            return `#${htmlElement.id}`;
        }else if(htmlElement.className){
            const classNames = htmlElement.className.split(' ').filter(name => name.trim() !== '');
            if(classNames.length > 0){
                return `.${classNames.map(name => CSS.escape(name)).join('.')}`;
            }   
        }
        else if(htmlElement.tagName){
            return htmlElement.tagName.toLowerCase();
        }
        else if(htmlElement.getAttribute('name')){
            return `[name="${htmlElement.getAttribute('name')}"]`;
        }
        else if(htmlElement.getAttribute('data-testid')){
            return `[data-testid="${htmlElement.getAttribute('data-testid')}"]`;
        }
        return '';
    }
}