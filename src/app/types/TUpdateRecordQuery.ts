type TPersonalInformation = {
    firstName: string,
    surName: string,
    middleName: string,
    extName: string | null,
    gender: string,
    dateOfBirth: string,
    maritalStatus: string,
}

type TContactInfo = {
    email: string | null,
    cpNumber: string | null,
    telNumber: string | null,
}

type TUpdateValues = {
    personalInformation: TPersonalInformation,
    personalContactInfo: TContactInfo,
    homeContactInfo: TContactInfo,
}

export type TUpdateQuery = {
    values: TUpdateValues,
    tableStateUpdates: {
        full_name: "MODIFIED" | "CURRENT_STATE",
        personal_information: "MODIFIED" | "CURRENT_STATE",
        personal_contact_info: "MODIFIED" | "CURRENT_STATE" | "REMOVED" | "CREATED",
        home_contact_info: "MODIFIED" | "CURRENT_STATE" | "REMOVED" | "CREATED"
    }
}