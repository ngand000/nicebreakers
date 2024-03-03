class Lock {
    constructor() {
        this.locked = false;
        this.queue = [];
    }

    lock() {
        return new Promise(resolve => {
            if (!this.locked) {
                this.locked = true;
                resolve();
            } else {
                this.queue.push(resolve);
            }
        });
    }

    unlock() {
        if (this.queue.length > 0) {
            const nextResolver = this.queue.shift();
            nextResolver();
        } else {
            this.locked = false;
        }
    }
}
