bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    basic.showString(control.deviceName())
    BLECommands.showPairingHistogram()
})
input.onButtonPressed(Button.A, function () {
    BLECommands.sendCommandWithArgument("darg", 2)
})
BLECommands.onCommand("narg", function () {
    basic.showIcon(IconNames.StickFigure)
})
input.onButtonPressed(Button.B, function () {
    BLECommands.sendCommand("dnarg")
})
BLECommands.onCommandwithArg("arg", function (value) {
    basic.showIcon(IconNames.Silly)
    basic.showNumber(value)
})
bluetooth.startUartService()
bluetooth.startButtonService()
basic.showString(control.deviceName())
BLECommands.showPairingHistogram()
