import React, { useEffect } from "react";
import philippinePlaces from "../philippinePlaces/philippinePlaces";

export function usePlacePickerSelect() {
    const [region, setRegion] = React.useState<null | string>(null);
    const [province, setProvince] = React.useState<null | string>(null);
    const [cityMun, setCityMun] = React.useState<null | string>(null);
    const [barangay, setBarangay] = React.useState<null | string>(null);

    return {
        region,
        province,
        cityMun,
        barangay,
        setRegion,
        setProvince,
        setCityMun,
        setBarangay
    }
}

export function optionValue(code: string, val: string) {
    return `${code}:${val}`
}

export function getValue(optionValue: string | null) {
    return optionValue? optionValue.split(':')[1] : optionValue;
}

export function getCode(optionValue: string | null) {
    return optionValue? optionValue.split(':')[0] : optionValue;
}

function usePhilippinePlacesPicker() {
    const [regionCode, setRegionCode] = React.useState<string |null>(null);
    const [provinceCode, setProvinceCode] = React.useState<string |null>(null);
    const [cityMunCode, setCityMunCode] = React.useState<string |null>(null);

    useEffect(() => {
        setProvinceCode(null);
    }, [regionCode]);

    useEffect(() => {
        setCityMunCode(null);
    }, [provinceCode]);

    return {
        regionCode,
        provinceCode,
        cityMunCode,
        setRegionCode,
        setProvinceCode,
        setCityMunCode,
        regions: philippinePlaces.regions,
        provinces: regionCode? philippinePlaces.getProvincesByRegion(regionCode) : null,
        cityMun: provinceCode? philippinePlaces.getCityMunByProvince(provinceCode) : null,
        barangay: cityMunCode? philippinePlaces.getBarangayByMun(cityMunCode) : null,
    }
}

export default usePhilippinePlacesPicker;