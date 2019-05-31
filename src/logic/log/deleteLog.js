export function handleDelete(theSelected, accessHistory) {
    const indexDeleted = [];
    const copyAccHis = [...accessHistory];
    for (let i = 0; i < theSelected.length; i += 1)
        indexDeleted.push(
            accessHistory.findIndex(x => x.logID === theSelected[i])
        );

    indexDeleted.sort(function(a, b) {
        return b - a;
    });
    indexDeleted.forEach(function(index) {
        copyAccHis.splice(index, 1);
    });

    return copyAccHis;
}
