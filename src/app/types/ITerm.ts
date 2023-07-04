type TPerson = {
    residentUID: string
}

type TPersonWidthCommittee = {
    residentUID: string,
    committee: string
}

export interface ITerm {
    startYear: number,
    endYear: number,
    barangayChairperson: TPerson,
    barangayTreasurer: TPerson,
    barangaySecretary: TPerson,
    barangayCouncilors: TPersonWidthCommittee[]
}

export interface ISKTerm {
    startYear: number,
    endYear: number,
    skChairperson: TPerson,
    skTreasurer: TPerson,
    skSecretary: TPerson,
    skCouncilors: TPersonWidthCommittee[]
}