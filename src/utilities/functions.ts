function getUniqueListBy(arr:[], key:string) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

export { getUniqueListBy}