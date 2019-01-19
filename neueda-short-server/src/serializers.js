module.exports = {
  shortened: (item) => ({
    success: true,
    data: {
      url: item.url,
      short: item._id,
      createdAt: item.createdAt
    }
  })
};
