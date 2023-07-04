interface IBarangayPersonel {
    residentUID: string,
    picture: string | null,
    firstName: string,
    middleName: string,
    surname: string,
    extName: string | null
}

interface IPersonelWithCommittee extends IBarangayPersonel {
    committee: string
}

export interface IBarangayOfficials {
    term:  number,
    start: string | number,
    end: string | number,
    barangayChairperson: IBarangayPersonel,
    barangaySecretary: IBarangayPersonel,
    barangayTreasurer: IBarangayPersonel,
    barangayCouncilors: IPersonelWithCommittee[]
}
