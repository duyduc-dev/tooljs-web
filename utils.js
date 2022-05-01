const checkDomEvents = () => {
    const namesMethodDomEvent = []
    for (const key in window) {
        if (key && key.startsWith('on')) {
            namesMethodDomEvent.push(key)
        }
    }
    const namesEventsOfTool = namesMethodDomEvent.map(nameEvents => 't' + nameEvents.slice(2))
    const elementDomEvents = new Set()
    for (const name of namesEventsOfTool) {
        if (name) {
            const elements = [...document.querySelectorAll(`[${name}]`)];
            if (elements && elements.length > 0) {
                elementDomEvents.add({ event: name, elements })
            }
        }
    }
    [...elementDomEvents].forEach(item => {
        item.elements.forEach(x => {
            const attr = x.getAttributeNode(item.event)
            x.removeAttributeNode(attr)  
            runJavascriptHtml(x, attr)
        })
    })
}

function runJavascriptHtml(app, attr) {
    const getNameEvent = (attr) => {
        const nameAttr = attr.localName
        return 'on' + nameAttr.slice(1)
    }
    app[getNameEvent(attr)] = e => {
        eval(attr.nodeValue);
        e.stopPropagation()
    }
}

export const checkElementDom = () => {
    checkDomEvents();

    return ''
}

