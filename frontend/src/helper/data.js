export const vinculateDataByIndex = (data, toJoin) => {
  return data.map((item, index) => {
    if (!toJoin[index])
      return item;

    return {
      ...item,
      ...toJoin[index]
    }
  })
}
