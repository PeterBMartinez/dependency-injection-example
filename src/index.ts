class UserService {
    sayHi() {
        console.log('Hello');
    }
}

class Component {
    constructor(public user: UserService) {}
}

class Injector {
    _container = new Map();

    constructor(_providers: any[] = []) {
        _providers.forEach((service: any) => {
            this._container.set(service, new service())
        });
    }

    get (service: any) {
        const serviceInstance = this._container.get(service)
        if (!serviceInstance) {
            throw Error("No provider found")
        }
        return serviceInstance;
    }
}

// somewhere in the main file

const injector = new Injector([UserService]);
const component = new Component(injector.get(UserService));
component.user.sayHi();