interface ISKPersonel {
    residentUID: string,
    picture: string | null,
    firstName: string,
    middleName: string,
    surname: string,
    extName: string | null
}

interface ISKPersonelWithCommittee extends ISKPersonel {
    committee: string
}

export interface ISKOfficials {
    term:  number,
    start: string | number,
    end: string | number,
    skChairperson: ISKPersonel,
    skSecretary: ISKPersonel,
    skTreasurer: ISKPersonel,
    skCouncilors: ISKPersonelWithCommittee[]
}
