type TResidentRecord = {
    residentUID: string,
    gender: string;
    maritalStatus: string,
    picture: string | null,
    permanentAddress: string,
    currentAddress: string | null,
    dateOfBirth: string,
    name: {
      firstName: string;
      lastName: string;
      middleName: string;
      extName: string | null;
    };
    personalContactInfo: {
      personalEmail: string | null,
      personalCPNumber: string | null,
      personalTelNumber: string | null
    },
    homeContactInfo: {
      homeEmail: string | null,
      homeCPNumber: string | null,
      homeTelNumber: string | null
    },
  };
  export default TResidentRecord;