/**
 * Andre Telfer, 2020
 */

const DEBUG = false

var typing_lines, current_line, typing_queue
let change_line = (line) => {
    typing_lines.forEach(el => el.classList.remove('caret'));
    current_line = typing_lines[line]
    current_line.classList.add('caret');
    if (!current_line.innerHTML.startsWith("$ ")) current_line.innerHTML = "$ " + current_line.innerHTML
}

document.addEventListener('DOMContentLoaded', () => {
    typing_lines = document.querySelectorAll(".typing")
    current_line = undefined

    change_line(0)
    typing_queue = new Queue({
        loop: true
    })
    typing_queue.push(new SleepTask({
        time: 3000
    }))
    typing_queue.push(new TypeTask({
        text: "BSc Computer Science",
        speed: 100
    }))
    typing_queue.push(new SleepTask({
        time: 1000
    }))
    typing_queue.push(new TypeTask({
        text: ", minor Math.",
        speed: 100
    }))
    typing_queue.push(new SleepTask({
        time: 3000
    }))
    typing_queue.push(new DelTask({
        count: 33
    }))
    typing_queue.push(new SleepTask({
        time: 1000
    }))
    typing_queue.push(new TypeTask({
        text: "Student, ",
        speed: 100
    }))
    typing_queue.push(new SleepTask({
        time: 1000
    }))
    typing_queue.push(new TypeTask({
        text: "MSc Neuroscience.",
        speed: 100
    }))
    typing_queue.push(new SleepTask({
        time: 3000
    }))
    typing_queue.push(new FooTask({
        foo: () => change_line(1)
    }))
    typing_queue.push(new SleepTask({
        time: 2000
    }))
    typing_queue.push(new TypeTask({
        text: "I write odd"
    }))
    typing_queue.push(new SleepTask({
        time: 1000
    }))
    typing_queue.push(new DelTask({
        count: 3
    }))
    typing_queue.push(new SleepTask({
        time: 1000
    }))
    typing_queue.push(new TypeTask({
        text: "silly",
        speed: 100
    }))
    typing_queue.push(new SleepTask({
        time: 1000
    }))
    typing_queue.push(new TypeTask({
        text: " code"
    }))
    typing_queue.push(new SleepTask({
        time: 500
    }))
    typing_queue.push(new TypeTask({
        text: "."
    }))
    typing_queue.push(new SleepTask({
        time: 1000
    }))
    typing_queue.push(new FooTask({
        foo: () => change_line(2)
    }))
    typing_queue.push(new SleepTask({
        time: 3000
    }))
    typing_queue.push(new TypeTask({
        text: "clear"
    }))
    typing_queue.push(new SleepTask({
        time: 4000
    }))
    typing_queue.push(new FooTask({
        foo: () => {
            typing_lines.forEach(el => el.innerHTML = "");
            change_line(0)
        }
    }))
    typing_queue.run()
})

class Queue {
    constructor(kwargs) {
        this.tasks = kwargs.tasks == undefined ? [] : kwargs.tasks
        this.loop = kwargs == undefined ? false : kwargs.loop
    }

    push(task) {
        task.callback = this.next.bind(this)
        this.tasks.push(task)
    }

    run() {
        this.next()
    } // Alias for next
    next() {
        if (!this.tasks.length) {
            if (DEBUG) console.log("Queue complete")
            return
        }
        if (DEBUG) console.log("Running task")
        let task = this.tasks.shift()

        if (this.loop) {
            let copy = task.copy()
            copy.callback = this.next.bind(this)
            this.tasks.push(copy)
        }

        task.run()
    }
}

class Task {
    constructor(kwargs) {
        this.kwargs = kwargs // Save a copy 
    }
    run() {} /* run behavior */
    complete() {
        if (DEBUG) console.log("Task complete")
        if (this.callback != undefined) this.callback();
        if (this.interval) clearInterval(this.interval)
    }
}

class TypeTask extends Task {
    constructor(kwargs) {
        super(kwargs)
        this.text = kwargs.text
        this.speed = kwargs.speed == undefined ? 75 : kwargs.speed;
    }

    run() {
        this.interval = setInterval(this.type_letter.bind(this), this.speed)
    }

    type_letter() {
        let char = this.text.charAt(0)
        current_line.innerHTML += char
        this.text = this.text.slice(1)
        if (!this.text.length) this.complete()
    }

    copy() {
        return new TypeTask(this.kwargs)
    }
}

class FooTask extends Task {
    constructor(kwargs) {
        super(kwargs)
        this.foo = kwargs.foo
    }

    run() {
        this.foo()
        this.complete()
    }

    copy() {
        return new FooTask(this.kwargs)
    }
}

class SleepTask extends Task {
    constructor(kwargs) {
        super(kwargs)
        this.time = kwargs.time
    }

    run() {
        setTimeout(this.complete.bind(this), this.time)
    }

    copy() {
        return new SleepTask(this.kwargs)
    }
}

class DelTask extends Task {
    constructor(kwargs) {
        super(kwargs)
        this.count = kwargs.count
        this.speed = kwargs.speed == undefined ? 50 : kwargs.speed;
    }

    run() {
        this.interval = setInterval(this.delete.bind(this), this.speed)
    }

    delete() {
        current_line.innerHTML = current_line.innerHTML.slice(0, current_line.innerHTML.length - 1)
        this.count -= 1
        if (this.count <= 0) this.complete()
    }

    copy() {
        return new DelTask(this.kwargs)
    }
}