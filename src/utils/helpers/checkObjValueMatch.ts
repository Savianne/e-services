function checkObjectValuesMatch(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    const obj1Values = Object.values(obj1);
    const obj2Values = Object.values(obj2);
  
    // Check if the lengths of the value arrays are equal
    if (obj1Values.length !== obj2Values.length) {
      return false;
    }
  
    // Check if each value in obj1 exists in obj2
    for (const value of obj1Values) {
      if (!obj2Values.includes(value)) {
        return false;
      }
    }
  
    // Check if each value in obj2 exists in obj1
    for (const value of obj2Values) {
      if (!obj1Values.includes(value)) {
        return false;
      }
    }
  
    // All values match
    return true;
  }

  export default checkObjectValuesMatch;