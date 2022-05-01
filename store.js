import { checkElementDom } from './utils.js'

const createStore = (reducer) => {
    let state = reducer();
    const roots = new Map();
    const showView = () => {
        for (const [root, component] of roots) {
            root.innerHTML = component();
        }
        checkElementDom()
    }
    window.toolJS = {
        toolDispatch: (type, action) => {
            state = reducer(state, type, action)
            showView()
        },
        toolAction: (type, action) => {
            state = reducer(state, type, action)
            checkElementDom()
        }
    }
    return {
        createRoot(rootElement) {
            return {    
                render: component => {
                    if (component) {
                        roots.set(rootElement, component)
                        showView();
                    }
                },
                attach: (component, root) => {
                    roots.set(root, component);
                    showView()
                }
            }
        },
        useSelector(selector = state => state) {
            return selector(state);
        },
        connectStore(selector = state => state) {
            return component => (props, ...args) =>
                component(Object.assign({}, selector(state), props, ...args))
        },
        useDispatch() {
            return {
                dispatch: (data) => `"toolJS.toolDispatch(${data})"`,
                action: (data) => `"toolJS.toolAction(${data})"`
            }
        },
    }
}


export const dataPayload = ({ type = '', payload = '' }) => `'${type}', ${payload}`

export default createStore;