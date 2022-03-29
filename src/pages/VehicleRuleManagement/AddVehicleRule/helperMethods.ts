

export const getProductIds = (arr: any) => {
    const temp: any = [];
    arr.map((obj: any) => temp.push(obj.value));
    return temp;
};