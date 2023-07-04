export type TAddress = {
    region: string,
    province: string,
    cityMun: string,
    barangay: string,
    zone: string
}

export type TUpdateResidentAddressQuery = {
    currentAddress: TAddress | null,
    permanentAddress: TAddress | null
}
