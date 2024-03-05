class Lock {
    // pre: lock is unlocked, queue is empty to hold locks
    constructor() {
        this.locked = false; // initiating unlocked lock
        this.queue = []; // initiating the queue to sustain locks
    }

    // pre: lock must be unlocked before attempting to acquire lock
// post: resolves the promise immediately if the lock is successfully acquired, or queues the lock request
// if the lock is locked.
    async lock() {
        return new Promise(resolve => {
            // checking if unlocked and if so, to lock and resolve
            if (!this.locked) {
                this.locked = true;
                resolve();
            // if not, adding lock request
            } else {
                this.queue.push(resolve);
            }
        });
    }

    // pre: n/a, unlocking lock is always an option
// post: release the lock if there are no pending lock requests or dequeues and resolves the next lock
// request if there is one.
    unlock() {
        if (this.queue.length > 0) {
            const nextResolver = this.queue.shift();
            nextResolver();
        } else {
            this.locked = false;
        }
    }
}