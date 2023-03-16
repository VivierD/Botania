const leafInfo = {
    primaryService : 0xFEC0,
    name : 'Feather_M0_BLE_PRPH',
    uid : '0000fec1-0000-1000-8000-00805f9b34fb'
}

const leafDeviceOption = {
    filters : [
        {namePrefix : 'BOTANIA'},
    ],
    optionalServices : [
        leafInfo.primaryService,
    ]
}

export {leafDeviceOption, leafInfo}