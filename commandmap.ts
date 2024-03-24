/**
 * Acts as a map of commands names to callbacks
 */
namespace BLECommands {
 

export class CommandCallbacks {
    private commandNames: string[]
    private argCommandNames: string[]

    private callbacks: (() => void)[]
    private argCallbacks: ((value: number) => void)[]

    public constructor() {
        this.commandNames = []
        this.argCommandNames = []
        this.callbacks = []
        this.argCallbacks = []
    }

    public addCommandCallback(commandName: string, callback: () => void) {
        this.commandNames.push(commandName.toLowerCase())
        this.callbacks.push(callback)
    }

    public addCommandCallbackwithArg(commandName: string, callback: (value: number) => void) {
        this.argCommandNames.push(commandName.toLowerCase())
        this.argCallbacks.push(callback)
    }

    public fireCallbackFor(commandName: string) {
        const callbackIndex = this.commandNames.indexOf(commandName.toLowerCase())
        if (callbackIndex == -1) {
            return
        }
        this.callbacks[callbackIndex]()
    }
    public fireCallbackwithArgFor(commandName: string, arg: number) {
        const callbackIndex = this.argCommandNames.indexOf(commandName.toLowerCase())
        if (callbackIndex == -1) {
            return
        }
        this.argCallbacks[callbackIndex](arg)
    }
}
}