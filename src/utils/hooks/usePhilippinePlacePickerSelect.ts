import { NoInfer } from "@reduxjs/toolkit/dist/tsHelpers";
import React, { useEffect } from "react";
import philippinePlaces from "../philippinePlaces/philippinePlaces";


export function optionValue(code: string, val: string) {
    return `${code}:${val}`
}

export function getValue(optionValue: string | null) {
    return optionValue? optionValue.split(':')[1] : optionValue;
}

export function getCode(optionValue: string | null) {
    return optionValue? optionValue.split(':')[0] : optionValue;
}

// type TusePhilippinePlacesPickerSelect = () => 
function usePhilippinePlacesPickerSelect(
    regionDispatcher: (val: string | null) => void, 
    provinceDispacher: (val: string | null) => void,
    cityMunDispatcher: (val: string | null) => void,
    barangayDispatcher: (val: string | null) => void
) {
    const [regionCode, setRegionCode] = React.useState<string |null>(null);
    const [provinceCode, setProvinceCode] = React.useState<string |null>(null);
    const [cityMunCode, setCityMunCode] = React.useState<string |null>(null);
    const [region, setRegion] = React.useState<string | null>(null);
    const [province, setProvince] = React.useState<string | null>(null);
    const [cityMun, setCityMun] = React.useState<string | null>(null);
    const [barangay, setBarangay] = React.useState<string | null>(null);

    useEffect(() => {
        setProvinceCode(null);
    }, [regionCode]);

    useEffect(() => {
        setCityMunCode(null);
    }, [provinceCode]);

    React.useEffect(() => {
        if(region == "") {
            setRegionCode(null);
            regionDispatcher("");
        } 

        if(region != null && region != "") {
            setRegionCode(getCode(region));
            regionDispatcher(getValue(region) as string);
        }

        if(region == null) {
            regionDispatcher(null);
        }

        setProvince(null);
    }, [region]);

    React.useEffect(() => {
        if(province == "") {
            setProvinceCode(null);
            provinceDispacher("")
        }

        if(province != null && province != "") {
            setProvinceCode(getCode(province));
            provinceDispacher(getValue(province) as string);
        }

        if(province == null) {
            provinceDispacher(null);
        }

        setCityMun(null);
    }, [province]);

    React.useEffect(() => {
        if(cityMun == "") {
            setCityMunCode(null);
            cityMunDispatcher("")
        }

        if(cityMun != null && cityMun != "") {
            setCityMunCode(getCode(cityMun));
            cityMunDispatcher(getValue(cityMun) as string);
        }

        if(cityMun == null) {
            cityMunDispatcher(null);
        }

        setBarangay(null);
    }, [cityMun]);

    React.useEffect(() => {
        barangayDispatcher(barangay)
    }, [barangay]);

    // interface retVal {
    //     regions: typeof philippinePlaces.regions | null,
    //     provinces: typeof philippinePlaces.provinces | null,
    //     cityMun: typeof philippinePlaces.city_mun | null,
    //     barangay: typeof philippinePlaces.barangays | null,
    //     setRegion: typeof setRegion | null,
    //     setProvince: typeof setProvince | null,
    //     setCityMun: typeof setCityMun | null,
    //     setBarangay: typeof setBarangay | null,
    //     values: {
    //         region: typeof region,
    //         province: typeof province,
    //         cityMun: typeof cityMun,
    //         barangay: typeof barangay
    //     }
    // }

    return {
        regions: philippinePlaces.regions,
        provinces: regionCode? philippinePlaces.getProvincesByRegion(regionCode) : null,
        cityMun: provinceCode? philippinePlaces.getCityMunByProvince(provinceCode) : null,
        barangay: cityMunCode? philippinePlaces.getBarangayByMun(cityMunCode) : null,
        setRegion,
        setProvince,
        setCityMun,
        setBarangay,
        values: {
            region: region == null? "" : region,
            province: province == null? "" : province,
            cityMun: cityMun == null? "" : cityMun,
            barangay: barangay == null? "" : barangay,
        }
    } 
}

export default usePhilippinePlacesPickerSelect;