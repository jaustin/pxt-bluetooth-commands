
/**
 * Bluetooth event/command blocks
 */
//% weight=95 color=#0fbcbc icon="\uf0a1" block="BLE commands"
namespace BLECommands {
    let initialised = false
    export let callbacks: CommandCallbacks = null

    function init(): void {
        if (initialised) {
            return
        }
        callbacks = new CommandCallbacks();
        bluetooth.startUartService()
        bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), parseInput)
        initialised = true
    }
    function parseInput(): void {
        let commandStr = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        serial.writeLine(commandStr)
        let command = commandStr.split(":", 3)
        serial.writeLine(commandStr)
        if (command[0] === "c") {
            if (command.length > 2) {
                callbacks.fireCallbackwithArgFor(command[1], parseInt(command[2]))
            } else {
                callbacks.fireCallbackFor(command[1])
            }
        } else {
            serial.writeLine("unknown message type")
        }
    }
    //% block="send BLE command $command"
    export function sendCommand(command: string): void {
        bluetooth.uartWriteLine("c:" + command)
    }
    //% block="send BLE command $command with $arg"
    export function sendCommandWithArgument(command: string, arg: number): void {
        bluetooth.uartWriteLine("c:" + command + ":" + arg.toString())
    }
    //% block="on BLE command $arg with $value"
    //% draggableParameters
    export function onCommandwithArg(arg: string, handler: (value: number) => void) {
        init()
        callbacks.addCommandCallbackwithArg(arg, handler)
    }
    //% block="on BLE command $arg"
    export function onCommand(arg: string, handler: () => void) {
        init()
        callbacks.addCommandCallback(arg, handler)

    }
    //% block="show pairing pattern"
    export function showPairingHistogram(): void {
        let n = control.deviceSerialNumber() >>> 0
        serial.writeLine("" + (n.toString()))
        let ld = 1
        let d = 5
        let h;
        basic.clearScreen()
        for (let i = 0; i < 5; i++) {
            h = Math.idiv(n % d, ld)
            serial.writeLine(h.toString())
            n += 0 - h
            d *= 5;
            ld *= 5;
            for (let j = 0; j < h + 1; j++) {
                led.plotBrightness(5 - i - 1, 5 - j - 1, 255)
            }
        }
    }

}
