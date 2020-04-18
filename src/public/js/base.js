class Subject {
    constructor(){
        this.state = 0;
        this.observe = [];
    }

    getState(){
        return this.state
    }

    setState(state){
        this.state = state
    }

    attach(observer){
        this.observe.push(observer)
    }

    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
}

class Observer{
    constructor(name, subject){
        this.name = name;
        this.subject = subject;
        this.subject.attach(this)
    }
    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}

module.exports = {
    Subject: Subject,
    Observer: Observer
}