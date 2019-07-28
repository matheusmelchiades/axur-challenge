import mediaData from '../storage/media.json';

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

export const vinculateMedia = (data) => {
  return data.map((item, index) => {
    if (!mediaData[index])
      return item;

    return {
      ...item,
      ...mediaData[index]
    }
  })
};
